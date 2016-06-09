module.exports = {
  view: "index",
  optional_path: ".html",
  global_navigation: {},
  content: {
      is_index: false,
      pagetitle:'IBM Bluemix - Application services',
      google_site_verification:"",
      meta_description:'Quickly create, deploy, and manage applications that redefine the user experience. Bluemix also provides easy pathways to connect existing applications and backend data to new cloud applications by creating scalable APIs in Java or Node.js with full API lifecycle management.',
      meta_keywords:'apps, applications, apis, java, node.js, lifecycle management, runtimes, containers, messaging, data, services, strongloop, websphere application server',
      canonical:'http://www.ibm.com/cloud-computing/bluemix/application-services/',
      segment_naming:{
        property:'Product (IBM.com)',
        value:'CF applications'
      },
      analytics:{
          "wipi" :  true,
          "tealeaf" :  false,
          "hotjar" :  true,
          "coremetrics" :  false,
          "optimizely" :  true,
          "segment" :  true,
          "enabled" :  true,
		      "segment_key" : "P1YMMnwSrsufGrHpg6uUzgVhaQXaP921"
      },
      digitalData:{
        primaryCategory:'IBMBLUEMIXPRODUCTS',
        pageID:'http://www.ibm.com/cloud-computing/bluemix/application-services/',
        siteID:'BLUEMIX'
      },
      stylesheet:[],
      javascript:[],
      breadcrumbs:[
        {
          label:'Products',
          url:'javascript: void(0);'
        },
        {
          label:"Application services",
          url:'javascript: void(0);'
        }
      ],
      leadspace:{
          leadspaceimg:"",
          header: "Application services",
          subhead: "Create, deploy and manage new applications at the speed of the modern enterprise",
          features: {
              enabled: false,
              list:[
                  "Accelerate the pace of innovation",
                  "Take advantage of existing IT",
                  "Build systems that use data to understand, reason and learn"
              ]
          },
          leadspace_video:{
              enabled: false,
              video:{
                  url:"",
                  id:"",
                  type:"",
                  img:""
              },
          },
          primary_cta:{
              enabled: true,
              cta:{
                  href:"https://console.ng.bluemix.net/registration/",
                  text: "Get started free",
                  onClick:"goPage(this); return false;"
              }
          },
          secondary_cta:{
              enabled: false,
              cta:[
                  {
                      href:"#",
                      text: "Pricing"
                  },
                  {
                      href:"#",
                      text: "Get started"
                  }
              ]
          }
      },
      // end leadspace

      modules:[]// end modules

  }// end Main content



}
