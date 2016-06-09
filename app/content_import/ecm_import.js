// var xmlparse = require('xml');
var fs = require('fs');
var et = require('elementtree');
var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;
var _ = require('underscore');
var recursive = require('recursive-readdir');

var path = require('path');

// our parsing rules
var nodeTypes = require('./node_types')(); // array of matching node types we care about
var fieldNameMap = require('./field_map')();

// parsing overview
// xml files have multiple top level <CONTENT> nodes - that is our first level scrape
// after that each content node filters for specific node types (node_types.js) 
// and maps to JSON fields defined in (field_map.js)

function parseSourceFile(filename) {
		var filenameArr = filename.split(/\\|\//g);
		var folder = filenameArr[filenameArr.length-2].toLowerCase(); ;
		
    var src = fs.readFileSync(filename, 'utf-8');
    var outPath = filename.replace('.xml', '.json');
    var entryTree = et.parse(src);
    var contentNodes = entryTree.findall('./CONTENT');
    var contentOut = {"template": "v18"};

    for (var node in contentNodes) {
        var type = contentNodes[node].findtext('./SHARED_DATA/TYPE');

        // also filter out nodes if ECMCC_MULTI_OPT2 JavaScript[==]js ?? or CSS?
        if (nodeTypes.indexOf(type) > -1) {
            var synkey = contentNodes[node].findtext('./SHARED_DATA/SYNDICATION_KEY');
            var title = contentNodes[node].findtext('./SHARED_DATA/TITLE');
            console.log('node type:' ,type, synkey, title);
            if (typeof contentOut[synkey] === 'undefined') contentOut[synkey] = {};
            if (title) contentOut[synkey].title = title;
            console.log('we have content synkey node:', contentOut[synkey]);
            contentOut = parseGroupNode(contentOut, folder, synkey, contentNodes[node], true, "");
        }
    }

    fs.writeFileSync(outPath, JSON.stringify(contentOut, null, "\t"));
} 

function applyValueToObjectPath(object, path, value) {
    // a generic way to make sure object.sub.sub.sub.thing exists + value setter
    path = path[0];// just one for now quick like
    // console.log('splitting json path:', path);
    var pathSplit = path.split('.');
    var pathEl;
    var pathLen = pathSplit.length;
    for (var i in pathSplit) {
        pathEl = pathSplit[i];
        // console.log('path split el:', i, pathLen, pathEl);
        if ((i + 1) < pathLen) {
            if (typeof object[pathEl] === 'undefined') object[pathEl] = {};    
        } else {
            console.log('appending to:', object);
            object[pathEl] = value;
        }
        
        object = object[pathEl]; // should maintain parent reference to original for next iter
    }
    // object[pathEl] = value; // and we just set?
}

function parseGroupNode(contentOut, folder, synkey, group, topLevelInd, guId) {
    var groups = group.findall('GROUP'); 
    var fields = group.findall('FIELD');
    
    var title = group.get("TITLE");
    // dont ignore anything. Let humans filter it out. OMG giving up
    var unmatched = {}; // store unmatched ones here for this synkey
    _.each(fields, function(field){        
        var fieldName = field.get('NAME');
        
        if (!field.text) return console.log('undefined field text:', fieldName);

        var mapout;

        if (fieldNameMap[fieldName]) {
            mapout = fieldNameMap[fieldName];
            if (synkey) mapout = synkey + "." + mapout;
            if (typeof mapout === "string") mapout = [mapout];

            // refactored -- new principles

            // 1. let humans filter out what guids go where, but don't ignore any content
            // 2. organize all by synkey in the JSON tree.
            // 3. simpler way to ensure object has a item.sub.thing path defined before assigning a value, methodized:

            applyValueToObjectPath(contentOut, mapout, field.text);

            // 4. modify the content importing so that we can build a guid-lookup to our batch processed json... see config/index
            
            // also previous logic was hard to understand and used evals:
            // a good reference: https://24ways.org/2005/dont-be-eval/

        } else {
            // dump it all anyway for easier testing what fields are good
            // contentOut[fieldName] = field.text;
            applyValueToObjectPath(unmatched, [fieldName], field.text);
        }
        
    });

    
    _.each(groups, function(group){
    		// if (synkey == "T315863B45858T18") {
      //   	console.log('group todo:', group.get("NAME"));
      //   }
        contentOut = parseGroupNode(contentOut, folder, synkey, group, false, group.get("GUID"));
    });

    // put unmatched keys on their own sub object we can ignore later or easier scan for items to add to fieldmap
    if (_.keys(unmatched).length > 0) {
        contentOut[synkey]._all = unmatched;
    }

    return contentOut;

}


function parseAllFilesIn(folder) {
    //read all xml files in a whole folder
    console.log('go folder:', typeof folder);
    function isNotXML(filename) {
        if (filename.indexOf('.xml') > -1) return false;
        return true;
    }
    recursive(__dirname + path.sep + folder, [isNotXML], function (err, files) {
      // Files is an array of filename 
      console.log(files);
      for (var file in files) {
        parseSourceFile(files[file]);
      }
    });
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


// parseAllFilesIn("RETAIL");

// parseSourceFile('RETAIL/I353459X76283D18_retail-index.xml');

module.exports = {
    parseSource: parseSourceFile,
    parseFolder: parseAllFilesIn
}