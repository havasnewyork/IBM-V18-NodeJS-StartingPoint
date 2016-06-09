module.exports = {
  view: "index",
  global_navigation: {},
  content: {
      is_index: false,
      pagetitle:'IBM Bluemix - Masters',
      meta_description:'Page description goes here',
      meta_keywords:'keywords, keywords',
      google_site_verification:"fyyUECSk4WTLE7hRZJbmwutGvcUekBOYx4LrGoeSKTw",
      canonical:'http://www.ibm.com/cloud-computing/bluemix/',
      segment_naming:{
        property:'Why Bluemix (IBM.com)',
        value:'What is Bluemix'
      },
      digitalData:{
        primaryCategory:'IBMBLUEMIXMASTERS',
        pageID:'IBMBLUEMIX MASTERS',
        siteID:'BLUEMIX'
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
      stylesheet:[],
      javascript:[],
      breadcrumbs:[
        {
          label:'Demo page',
          url:'javascript: void(0);'
        }
      ],
      leadspace:{
          leadspaceimg:"/cloud-computing/bluemix/images/fpo.svg",
          header: "Building pages in node",
          subhead: "No matter what kind of event you’re hosting, understanding what your audience is talking about is critical to your success.",
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
              enabled: false,
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
      modules:[
        {
          temp:"products",
          content:{
            class:"ibm-band ibm-padding-top-2 ibm-padding-bottom-1",
            background:"background: #f3f6fc;",
            headline:"This is cards Array module",
            //text:"With three integrated deployment models, spanning from our data centers to yours, Bluemix gives the modern enterprise freedom to approach the cloud how they choose.",
            cards:[
                {
                  class:"ibm-col-6-2 ibm-col-medium-4-2 wow fadeIn",
                  style:"border:none;background-color:#FFFFFF;",
                  subhead:"From code to production in minutes",
                  text:"Access everything you need to build all kinds of apps. Work on your own or use the collaboration tools to work with a team. In minutes go from source code to a running app.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-speedtovalue.svg",
                    style:"max-height:187px;"
                  }
                },
                {
                  class:"ibm-col-6-2 ibm-col-medium-4-2 wow fadeIn",
                  style:"border:none;background-color:transparent;",
                  subhead:"Accelerate app delivery",
                  text:"Innovate like a startup, scale for the enterprise. You can host an open source project, run a hackathon or start a skunkworks. Plan anything, even the monthly meetup.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-shipfaster.svg",
                    style:"max-height:187px;"
                  }
                },
                {
                  class:"ibm-col-6-2 ibm-col-medium-4-2 wow fadeIn",
                  style:"border:none;background-color:transparent;",
                  subhead:"Deploy with confidence",
                  text:"Automatically deploy your projects whenever a project member pushes code to your repository. Simply deploy files as they are pushed, or you can configure more advanced build options.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-devops.svg",
                    style:"max-height:187px;"
                  }
                },
                {
                  class:"ibm-col-6-2 ibm-col-medium-4-2 wow fadeIn",
                  style:"border:none;background-color:#FFFFFF;",
                  subhead:"From code to production in minutes",
                  text:"Access everything you need to build all kinds of apps. Work on your own or use the collaboration tools to work with a team. In minutes go from source code to a running app.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-speedtovalue.svg",
                    style:"max-height:187px;"
                  }
                }

              ]


          }
        },
        {
          temp:"products",
          content:{
            class:"ibm-band ibm-padding-top-2 ibm-padding-bottom-1",
            background:"background: #f3f6fc;",
            headline:"This is cards object module",
            //text:"With three integrated deployment models, spanning from our data centers to yours, Bluemix gives the modern enterprise freedom to approach the cloud how they choose.",
            cards:{
              class:"ibm-col-6-2 ibm-col-medium-4-2 wow fadeIn",
              style:"border:none;background-color:transparent;",
              card:[
                {
                  subhead:"From code to production in minutes",
                  text:"Access everything you need to build all kinds of apps. Work on your own or use the collaboration tools to work with a team. In minutes go from source code to a running app.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-speedtovalue.svg",
                    style:"max-height:187px;"
                  }
                },
                {
                  subhead:"Accelerate app delivery",
                  text:"Innovate like a startup, scale for the enterprise. You can host an open source project, run a hackathon or start a skunkworks. Plan anything, even the monthly meetup.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-shipfaster.svg",
                    style:"max-height:187px;"
                  }
                },
                {
                  subhead:"Deploy with confidence",
                  text:"Automatically deploy your projects whenever a project member pushes code to your repository. Simply deploy files as they are pushed, or you can configure more advanced build options.",
                  image:{
                    class:"ibm-card__image ibm-center-block",
                    src:"/cloud-computing/bluemix/images/valueprop-devops.svg",
                    style:"max-height:187px;"
                  }
                }

              ]
            }

          }
        },
        {
          temp:"tabgroup",
          content:{
            background:"background: #FFF",
            class:"ibm-band ibm-padding-top-2 ibm-padding-bottom-2",
            headline:"this is my widget",
            subheader:"sub header to the tabs widget",
            text:"By combining Watson Sentiment Analysis, Natural Language Classifier, Streaming Analytics, and Cloudant on IBM Bluemix, you can build a social command center to identify emerging trends and topics of discussion around your event and brand.",
            tabs:[
              {
                label:"tab 1",
                class:"bla bla",
                prefix:"set-",
                content:{
                  text:"this is the content within the tab 1",
                  ctagroup:{
                    type:"inline",
                    class:"ibm-ind-link ibm-cta-group-auto ibm-margin-right-2",
                    cta:[
                      {
                        text:"View demo",
                        url:"#",
                        onClick:"",
                        class:"ibm-forward-link"
                      },
                      {
                        text:"View app code",
                        url:"#",
                        onClick:"",
                        class:"ibm-forward-link"
                      }
                    ]
                  },
                  list:[
                    {
                      class:"ibm-btn-sec ibm-btn-blue-50",
                      text:"Measure participant or viewer engagement in real time"
                    },
                    {
                      class:"ibm-btn-sec ibm-btn-blue-50",
                      text:"Uncover actionable insights"
                    },
                    {
                      class:"ibm-btn-sec ibm-btn-blue-50",
                      text:"Craft new content based on trending topics and user interactions"
                    }
                  ],


                  cards:[
                    {
                      class:"ibm-col-6-3 wow fadeIn ibm-col-medium-1-1",
                      eyebrow:"IBM Cloudant",
                      headline:"Try out a durable, scalable & highly available database for today's applications",
                      text:"IBM Cloudant is a fully managed JSON document DBaaS that’s optimized for data availability, durability, and mobility. What makes IBM Cloudant unique is its advanced indexing and ability to push data to the network edge, across multiple data centers and devices, for faster access and greater fault tolerance.",
                      ctagroup:{
                        type:"list",
                        class:"ibm-ind-link",
                        cta:[
                          {
                            text:"View more details about IBM Cloudant",
                            url:"#",
                            onClick:"",
                            class:"ibm-forward-link"
                          },
                          {
                            text:"View IBM Cloudant tutorials",
                            url:"#",
                            onClick:"",
                            class:"ibm-forward-link"
                          }
                        ]
                      },
                      video:{
                        title:"IBM Cloudant",
                        display:"inline",
                        url:"https://www.youtube.com/watch?v=xxxxxx",
                        id:"xxxxxx",
                        type:"youtube",
                        img:"/cloud-computing/bluemix/images/fpo.svg",
                        timeStamp:"0.35"
                      },
                      cta:{
                        parentClass:"ibm-ind-link",
                        class:"ibm-forward-link",
                        text:"this is my link",
                        url:"http://cnn.com"
                      }
                    },
                    {
                      class:"ibm-col-6-3 wow fadeIn  ibm-col-medium-1-1 bluemix-fc-alt",
                      video:{
                        title:"IBM Cloudant",
                        display:"inline",
                        url:"https://www.youtube.com/watch?v=xxxxxx",
                        id:"xxxxxx",
                        type:"youtube",
                        img:"/cloud-computing/bluemix/images/fpo.svg"
                      }
                    }

                  ]

                } // end content
              },
              {
                label:"tab 2",
                class:"bla bla",
                prefix:"set-",
                content:{
                  text:"this is the content within the tab 2"
                }
              }
            ]
          }
        },
        {
          temp:"tabgroup",
          content:{
            background:"background: #FFF",
            class:"ibm-band ibm-padding-top-2 ibm-padding-bottom-2",
            headline:"this is my widget",
            subheader:"sub header to the tabs widget",
            text:"By combining Watson Sentiment Analysis, Natural Language Classifier, Streaming Analytics, and Cloudant on IBM Bluemix, you can build a social command center to identify emerging trends and topics of discussion around your event and brand.",
            tabs:[
              {
                label:"tab 1",
                class:"bla bla",
                prefix:"set-b",
                content:{
                  text:"this is the content within the tab 1"
                }
              },
              {
                label:"tab 2",
                class:"bla bla",
                prefix:"set-b",
                content:{
                  text:"this is the content within the tab 2"
                }
              }
            ]
          }
        },
        {
          temp:"introduction",
          content:{
            background:"background: #f3f6fc",
            class:"ibm-band ibm-padding-top-2 ibm-padding-bottom-2 bluemix-intro",
            text:"By combining Watson Sentiment Analysis, Natural Language Classifier, Streaming Analytics, and Cloudant on IBM Bluemix, you can build a social command center to identify emerging trends and topics of discussion around your event and brand.",

            list:[
              {
                class:"ibm-btn-sec ibm-btn-blue-50",
                text:"Measure participant or viewer engagement in real time"
              },
              {
                class:"ibm-btn-sec ibm-btn-blue-50",
                text:"Uncover actionable insights"
              },
              {
                class:"ibm-btn-sec ibm-btn-blue-50",
                text:"Craft new content based on trending topics and user interactions"
              }
            ]
          }
        },
        {
          temp:"feature2col",
          content:{
            class:"ibm-band ibm-padding-top-3 ibm-padding-bottom-2 bluemix-fc-alt",
            background:"background: #FFFFFF;",
            cards:[
              {
                class:"ibm-col-6-3 wow fadeIn ibm-col-medium-1-1",
                eyebrow:"Natural Language Classifier",
                headline:"Interpret and classify natural language with confidence",
                /*subhead:"Ingest, analyze, monitor, and correlate data as it arrives from real-time sources.",*/
                text:"Enable your developers to create natural language interfaces for their applications with a service that interprets the intent behind social text and returns a corresponding classification with associated confidence levels.<p>Learn how to build a question-and-answer application using a small amount of data</p>",
                ctagroup:{
                  type:"inline",
                  class:"ibm-ind-link ibm-cta-group-auto ibm-margin-right-2",
                  cta:[
                    {
                      text:"View demo",
                      url:"#",
                      onClick:"",
                      class:"ibm-forward-link"
                    },
                    {
                      text:"View app code",
                      url:"#",
                      onClick:"",
                      class:"ibm-forward-link"
                    }
                  ]
                }
              },
              {
                class:"ibm-col-6-3 wow fadeIn  ibm-col-medium-1-1 bluemix-fc-alt",
                video:{
                  title:"Natural Language Classifier",
                  display:"inline",
                  url:"https://www.youtube.com/watch?v=xxxxxx",
                  id:"xxxxxx",
                  type:"youtube",
                  img:"/cloud-computing/bluemix/images/fpo.svg"
                }
              }

            ]

          }
        },
        {
          temp:"feature2col",
          content:{
            class:"ibm-band ibm-padding-top-3 ibm-padding-bottom-2 bluemix-fc-alt",
            background:"background: #f3f6fc;",
            cards:[
              {
                class:"ibm-col-6-3 wow fadeIn ibm-col-medium-1-1",
                image:{
                  alt:"Put your apps and data to work anywhere",
                  src:"/cloud-computing/bluemix/dedicated/imgs/work-anywhere.svg"
                }
              },
              {
                class:"ibm-col-6-3 wow fadeIn ibm-col-medium-1-1",
                headline:"Put your apps and data to work anywhere",
                text:"Bluemix is available across more than 25 IBM data centers around the world and in any data center of yours. Pick and choose any combination of deployment models to optimize your apps and services for performance, regulatory considerations, cost, and scale.",
                ctagroup:{
                  type:"list",
                  class:"ibm-ind-link",
                  cta:[
                    {
                      text:"Read the Streaming Analytics blog post",
                      url:"#",
                      onClick:"",
                      class:"ibm-forward-link"
                    },
                    {
                      text:"Try out the Streaming Analytics starter app",
                      url:"#",
                      onClick:"",
                      class:"ibm-forward-link"
                    }
                  ]
                }
              }

            ]

          }
        },
        {
          temp:"feature2col",
          content:{
            class:"ibm-band ibm-padding-top-3 ibm-padding-bottom-2 bluemix-fc-alt",
            background:"background: #FFFFFF;",
            cards:[
              {
                class:"ibm-col-6-3 wow fadeIn ibm-col-medium-1-1",
                eyebrow:"IBM Cloudant",
                headline:"Try out a durable, scalable & highly available database for today's applications",
                text:"IBM Cloudant is a fully managed JSON document DBaaS that’s optimized for data availability, durability, and mobility. What makes IBM Cloudant unique is its advanced indexing and ability to push data to the network edge, across multiple data centers and devices, for faster access and greater fault tolerance.",
                ctagroup:{
                  type:"list",
                  class:"ibm-ind-link",
                  cta:[
                    {
                      text:"View more details about IBM Cloudant",
                      url:"#",
                      onClick:"",
                      class:"ibm-forward-link"
                    },
                    {
                      text:"View IBM Cloudant tutorials",
                      url:"#",
                      onClick:"",
                      class:"ibm-forward-link"
                    }
                  ]
                }
              },
              {
                class:"ibm-col-6-3 wow fadeIn  ibm-col-medium-1-1 bluemix-fc-alt",
                video:{
                  title:"IBM Cloudant",
                  display:"inline",
                  url:"https://www.youtube.com/watch?v=xxxxxx",
                  id:"xxxxxx",
                  type:"youtube",
                  img:"/cloud-computing/bluemix/images/fpo.svg"
                }
              }

            ]

          }// content
        },

        {
          temp:"videoBand",
          content:{
              background:"background: #FFFFFF url(/cloud-computing/bluemix/images/fpo.svg) center center no-repeat",
              class:"ibm-col-6-5 ibm-center-block ibm-alternate-background ibm-padding-top-3 ibm-padding-bottom-3 bluemix-video",
              /*
              headline:"Speed innovation",
              subhead:"With developer-centric compute models, instant access to over 150 services – including ones that facilitate modern architecture and delivery practices around mobile, microservices, DevOps and continuous delivery – Bluemix makes it easier to ship powerful, high-quality software every day.",

              */
              url:"https://youtu.be/8BBN3BWkmMM",
              id:"8BBN3BWkmMM",
              type:"youtube",
              img_transprarent:"/cloud-computing/bluemix/images/transparent.png",
              ctagroup:{
                type:"inline",
                class:"ibm-ind-link ibm-cta-group-50 ibm-padding-top-30 ibm-padding-bottom-3",
                cta:[
                  {
                    text:"View more details about Cloudant",
                    url:"#",
                    onClick:"",
                    class:"ibm-btn-sec ibm-btn-blue-50"
                  },
                  {
                    text:"View Cloudant tutorials",
                    url:"#",
                    onClick:"",
                    class:"ibm-forward-link"
                  }
                ]
              },
              cta:{
                text:"Learn more about IBM connect",
                url:"http://www.ibm.com/cloud-computing/connect/",
                onClick:"",
                target:"_blank"
              }

          }
        },
        {
          temp:"related",
          content:{
            class:"ibm-band bluemix-cards ibm-padding-top-2 ibm-padding-bottom-1",
            background:"background: #f3f6fc",
            cards:[
              {
                style:"border: none;",
                headline:"Related resources",
                list:[
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"IBM Open Cloud",
                    url:"#",
                    onClick:""
                  },
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"developerWorks Open",
                    url:"http://www.ibm.com/developerworks/",
                    onClick:""
                  },
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"Bluemix blog",
                    url:"https://developer.ibm.com/bluemix/blog/",
                    onClick:""
                  }
                ]
              },
              {
                style:"border: none;",
                headline:"Video asset",
                video:{
                  title:"Bluemix Streaming Analytics",
                  display:"overlay",
                  url:"https://www.youtube.com/watch?v=xxxxxx",
                  id:"xxxxxx",
                  type:"youtube",
                  img:"/cloud-computing/bluemix/images/fpo.svg",
                  text:"IBM Social sentiment application at the Australian Open"
                }

              },
              {
                style:"border: none;",
                headline:"Related services",
                list:[
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"Bluemix Alchemy Topic Analysis",
                    url:"#",
                    onClick:""
                  },
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"Bluemix Alchemy Sentiment",
                    url:"#",
                    onClick:""
                  },
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"Node SDK",
                    url:"#",
                    onClick:""
                  },
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"Java buildpack for content ingest",
                    url:"#",
                    onClick:""
                  },
                  {
                    class:"ibm-textcolor-blue-40",
                    text:"Alchemy Keyword Extraction",
                    url:"#",
                    onClick:""
                  }
                ]
              }
            ]
          }
        }


      ]
  },
}
