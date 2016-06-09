module.exports = function(grunt) {

    grunt.initConfig({
      jsfiles: [
              'public/javascripts/ismobile.js',
              'public/javascripts/browser.js',
              'public/javascripts/imagesloaded.pkgd.min.js',
              'public/javascripts/ocean_images_manager.js',
              'public/javascripts/ocean_carousel.js',
              'public/javascripts/ocean_sitenav.js',
              'public/javascripts/ocean_parallax.js',
              'public/javascripts/ocean_animations.js',
              'public/javascripts/responsive_grid.js',
              'public/javascripts/showhide_grid.js',
              'public/javascripts/parallaxscroll.js',
              'public/javascripts/video_switcher.js',
              'public/javascripts/responsive_homepage.js',
              'public/javascripts/news_feed.js', // front-end fetcher 
              'public/javascripts/ocean_tracking.js', // extra analytics tags
              'public/javascripts/main.js' // last plz
            ],
      jsinfrastructure: [
        "public/javascripts/topojson.v1.min.js",
        "public/javascripts/datamaps.world.min.js",
        "public/javascripts/infrastructure.js"
      ],

      svgstore: {
        options: {
          prefix : 'icon-', // This will prefix each ID
          svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
            viewBox : '0 0 1000 1000',
            xmlns: 'http://www.w3.org/2000/svg',
            style: 'display: none;',
            preserveAspectRatio: "xMinYMin meet"
          }
        },
        oceanshape: {
        // Target-specific file lists and/or options go here.
            prefix: 'oceanshape-',
            files: {
              // dest to the html partials directory so it's picked up by stencil
              // partials: "<%= srcpath %>/html/partials",
              'views/partials/shapes.html': 'public/shapes/shape*.svg'
            }
        },
      },
      uglify: {
        main: {
          files: {
            'public/javascripts/main.min.js': '<%= jsfiles %>'
          }
        },
        infrastructure: {
          files: {
            'public/javascripts/infrastructure.min.js': '<%= jsinfrastructure %>'
          }
        },
        options: {
          sourceMap: true,
          compress: true,
          // banner: ""
        }
      },
      watch: {
        scripts: {
          files: '<%= jsfiles %>',
          tasks: ['uglify:main'],
          options: {
            spawn: false,
          },
        },
        scripts2: {
          files: '<%= jsinfrastructure %>',
          tasks: ['uglify:infrastructure'],
          options: {
            spawn: false,
          },
        },
      },
    });



    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'uglify');   
}
