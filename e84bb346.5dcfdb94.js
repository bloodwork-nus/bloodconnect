(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{125:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return b})),a.d(t,"rightToc",(function(){return i})),a.d(t,"default",(function(){return s}));var n=a(2),o=a(6),r=(a(0),a(132)),l={id:"milestone1",title:"Milestone 1 \ud83d\ude80",sidebar_label:"Milestone 1"},b={id:"milestone1",title:"Milestone 1 \ud83d\ude80",description:"Proposed level of achievement: Artemis.",source:"@site/docs\\milestone1.md",permalink:"/bloodconnect/docs/milestone1",editUrl:"https://github.com/bloodwork-nus/bloodconnect-docs/edit/master/docs/milestone1.md",sidebar_label:"Milestone 1",sidebar:"someSidebar",previous:{title:"Powered by MDX",permalink:"/bloodconnect/docs/mdx"},next:{title:"Milestone 2 \ud83d\udee0",permalink:"/bloodconnect/docs/milestone2"}},i=[{value:"Motivation",id:"motivation",children:[]},{value:"Aim of project",id:"aim-of-project",children:[]},{value:"User stories",id:"user-stories",children:[]},{value:"Scope of project",id:"scope-of-project",children:[{value:"Mobile application",id:"mobile-application",children:[]},{value:"Authentication",id:"authentication",children:[]},{value:"Smart search",id:"smart-search",children:[]},{value:"Push notifications",id:"push-notifications",children:[]},{value:"Web application",id:"web-application",children:[]},{value:"OTP verification",id:"otp-verification",children:[]},{value:"Custom protocol handler",id:"custom-protocol-handler",children:[]},{value:"Expression of gratitude",id:"expression-of-gratitude",children:[]},{value:"Open API",id:"open-api",children:[]}]},{value:"Other platforms",id:"other-platforms",children:[]},{value:"User flow",id:"user-flow",children:[]},{value:"Project Log",id:"project-log",children:[]}],c={rightToc:i};function s(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Proposed level of achievement: ",Object(r.b)("strong",{parentName:"p"},"Artemis"),"."),Object(r.b)("h2",{id:"motivation"},"Motivation"),Object(r.b)("p",null,"For a country of approximately 5.7 million people, the 75,655 donors in 2019","\u2014","approx. 1.33%","\u2014","was particularly\nlow.",Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-1"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-1",className:"footnote-ref"}),"1"))," In fact, in 2019, the Singapore Red Cross and Health Sciences Authority appealed for blood donors as stocks\nin blood banks reached low levels.",Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-2"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-2",className:"footnote-ref"}),"2"))," Approximately 3,000 donors of any types were needed to restore the stocks to a\nhealthy level. This shortage was grave as the blood group with the greatest extent of shortage was O, the universal group\nused in emergencies, particulary when the blood identity of the patient was unknown. The situation is exacerbated by\nthe fact that the number of young donors is declining at a steady rate, from about 23,000 in 2008 to 18,000 in\n2019.",Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-1"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-1",className:"footnote-ref"}),"1")),Object(r.b)("sup",null,","),Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-3"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-3",className:"footnote-ref"}),"3"))," As the population is being increasingly dominated by senior citizens, and the current COVID-19\npandemic progresses, blood donors are needed more than ever."),Object(r.b)("p",null,"When there is a lack of supply for a particular blood type in blood banks or hospital inventories, patients and families\nturn to social media to look for blood donors. While this method may reach a myriad of potential donors, it is not\nalways deterministic. There is also no guarantee that the potential donors are reachable, and this weakness in this\nmethod may be crucial in times of crisis. The Singapore Red Cross and HSA have a database of blood donors which are\ncontactable when blood supplies are needed. However, this system limits the coverage to only the regular registered\ndonors. Hence, we propose the development of a platform, ",Object(r.b)("strong",{parentName:"p"},"BloodConnect"),", to connect blood donors and donees whenever,\nwherever. BloodConnect allows users to create blood requests, which are viewable by other users as potential donors.\nNearby users will also be notified. If a user decides to donate to a request, they will be connected to the requester\nand arrange a meeting at the hospital of request. Through this platform, we aim to bridge the gap between donors and\ndonees and decrease the waiting time to find blood, particularly in emergencies."),Object(r.b)("h2",{id:"aim-of-project"},"Aim of project"),Object(r.b)("p",null,"To ensure consistent healthy supply of blood at bloodbanks and bridge the gap between blood donors and blood seekers, we\naim to develop a platform to provide information on blood requests and notify nearby potential donors to reduce the waiting\ntime for blood donations in emergency situations and encourage young donors through a relevant, digital platform with\nthe ease to search avenues for blood donations."),Object(r.b)("h2",{id:"user-stories"},"User stories"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"As a ",Object(r.b)("em",{parentName:"li"},"blood donor"),", I want to be able to see blood requests to which I can donate my blood."),Object(r.b)("li",{parentName:"ul"},"As a ",Object(r.b)("em",{parentName:"li"},"blood donor"),", I want to be notified when blood donation is required near my location."),Object(r.b)("li",{parentName:"ul"},"As a ",Object(r.b)("em",{parentName:"li"},"blood seeker"),", I want to be able to create a blood request with my contact details and connect with an eligible donor fast."),Object(r.b)("li",{parentName:"ul"},"As a ",Object(r.b)("em",{parentName:"li"},"blood bank administrator"),", I want to be able to create a blood request when the blood stocks are running low."),Object(r.b)("li",{parentName:"ul"},"As a ",Object(r.b)("em",{parentName:"li"},"hospital or health institution staff"),", I want to be able to create a blood request when blood stocks are running\nlow or my patients requires direct blood transfusion."),Object(r.b)("li",{parentName:"ul"},"As a ",Object(r.b)("em",{parentName:"li"},"research institution staff"),", I want to be able to create a blood request when I need donors for research\npurposes (e.g. recovered COVID-19 donors for vaccine research, etc)."),Object(r.b)("li",{parentName:"ul"},"As an ",Object(r.b)("em",{parentName:"li"},"blood donation event organiser"),", I want to be able to create a blood request inform of my event and increase\nparticipation.")),Object(r.b)("h2",{id:"scope-of-project"},"Scope of project"),Object(r.b)("p",null,"The platform utilises mobile (for Android and iOS) and web applications as the ",Object(r.b)("strong",{parentName:"p"},"front-end")," interfaces for blood donors\nto view and respond to blood requests and blood seekers to create blood requests. The\n",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://github.com/bloodwork-nus/bloodconnect"}),"mobile app")," is being developed with ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://reactnative.dev"}),"React Native"),"\nand the web app will be developed with ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://reactjs.org"}),"React"),"."),Object(r.b)("p",null,"A set of ",Object(r.b)("strong",{parentName:"p"},"back-end")," APIs will be developed for authentication, database, push notifications, and pairing algorithms.\nThis will be developed with ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://nodejs.org"}),"Node.js")," and ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://firebase.google.com"}),"Firebase")," cloud functions."),Object(r.b)("hr",null),Object(r.b)("p",null,"In addition of the algorithm to pair donors and donees, these are the several features to be completed by ",Object(r.b)("strong",{parentName:"p"},"mid June"),"."),Object(r.b)("h3",{id:"mobile-application"},"Mobile application"),Object(r.b)("p",null,"This app is the main BloodConnect app which enables users to create, view, and respond to blood requests. Registered\nusers will be able to view their donations/requests history and be notified of nearby blood donations. Users can also\nshare blood requests to their friends."),Object(r.b)("h3",{id:"authentication"},"Authentication"),Object(r.b)("p",null,"Using Firebase, BloodConnect allows for user accounts creation. In addition, OAuth will also be implemented to allow\nusers to create account with existing services, e.g. Google or Facebook accounts."),Object(r.b)("h3",{id:"smart-search"},"Smart search"),Object(r.b)("p",null,"The search function in BloodConnect will be developed to allow searches based on blood type, types of venues, emergency,\ntime, descriptions, and venue names. In addition, voice search will also be implemented."),Object(r.b)("h3",{id:"push-notifications"},"Push notifications"),Object(r.b)("p",null,"Nearby donors (registered users) will be notified when a blood request is made requiring their blood type. Users can\nopt to be notified of all blood requests, only emergency ones, those coming from specific venues (hospitals or blood banks),\netc."),Object(r.b)("hr",null),Object(r.b)("p",null,"These are the several features to be completed by ",Object(r.b)("strong",{parentName:"p"},"mid July"),"."),Object(r.b)("h3",{id:"web-application"},"Web application"),Object(r.b)("p",null,"To increase accessibility, a web app version of BloodConnect, accessible from mobile and desktop browsers, will also be\ndeveloped."),Object(r.b)("h3",{id:"otp-verification"},"OTP verification"),Object(r.b)("p",null,"OTP verification for users' mobile phone or email verifications."),Object(r.b)("h3",{id:"custom-protocol-handler"},"Custom protocol handler"),Object(r.b)("p",null,"Since users can share blood requests, we plan to share the blood requests in a form of a link which will be able to\nredirect users to the web or mobile app. To redirect to the latter, a custom protocol handler is needed."),Object(r.b)("h3",{id:"expression-of-gratitude"},"Expression of gratitude"),Object(r.b)("p",null,"After a successful blood donation, an animation will be displayed to thank donors for their heroic and selfless\ncontribution."),Object(r.b)("h3",{id:"open-api"},"Open API"),Object(r.b)("p",null,"We plan to develop an open API for developers alike to build upon our platform. Although we believe that these APIs will\nbe useful, as of now, it is still a tentative milestone."),Object(r.b)("h2",{id:"other-platforms"},"Other platforms"),Object(r.b)("p",null,"We did a literature review and there have been similar platforms developed,\nsuch as ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://simplyblood.com"}),"Simply Blood"),", ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://donor2donor.com/"}),"Donor2Donor"),", ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://blood4life.id/"}),"Blood4Life.ID"),", and ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app"}),"Red Cross Connection"),"."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://simplyblood.com"}),"Simply Blood"),", developed in 2017",Object(r.b)("br",{parentName:"p"}),"\n","Simply Blood is an Android and web app developed as a platform to connect blood donors\nwith blood seekers to alleviate blood shortage, wastage, and transfusion waiting time. After inspecting the app,\nwe saw that it requires ",Object(r.b)("em",{parentName:"p"},"all")," users (donors and seekers) to create\nan account with their mobile phone number, which is verified by an SMS OTP. The app also requires blood requesters\nto provide their full name, which may be considered a privacy concern, as some users may not want to disclose the\nfact that they have medical conditions which require blood transfusion. ",Object(r.b)("strong",{parentName:"p"},"With BloodConnect"),", we will design a more intuitive UI which not only looks modern and recent, but also easy to use. BloodConnect will only require ",Object(r.b)("em",{parentName:"p"},"blood seekers"),"\nto register and verify their email address to prevent illegal activities, but allow ",Object(r.b)("em",{parentName:"p"},"blood donors")," to use the app\nwithout registration. However, blood donors can create an account to view their donation history, save their\nfitness survey for a set period of time (TBC), and be notified of any nearby blood requests. BloodConnect ",Object(r.b)("strong",{parentName:"p"},"will not")," require users' full name for privacy reasons.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://donor2donor.com/"}),"Donor2Donor"),", developed in 2016",Object(r.b)("br",{parentName:"p"}),"\n","This app takes a different approach towards finding blood donations. First of all, this app also allows for organ\ndonations, not only blood donations. Secondly, this app allows blood seekers to find available blood donors with\nmaximum radius of 50 km. This approach is different from BloodConnect's, as donors will have to publish their\navailability in the platform and blood seekers will choose from a list of available donors. Donor2Donor, despite having\ntheir website written in English, seems to focus on the Indian community, as their ads are mainly in Hindi. We aim\nto enable connections in any parts of the world.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://blood4life.id/"}),"Blood4Life.ID"),", developed in 2009",Object(r.b)("br",{parentName:"p"}),"\n","In 2009, Blood4Life.ID used mailing lists, and shifted to Twitter and Facebook in 2010. In 2019, they developed the\n",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"http://blood4life.id"}),"web application"),' as a more systematic platform. It appears that Blood4Life.ID takes a more\nsocial approach, as their web app contains a lot of posts, events, news, community collaterals, and blood requests\nmap in between. Also, this platform is only available for the Indonesian community. Its blood donation search\nfunction only "posts" request and donors will have to search and contact the requester directly. ',Object(r.b)("strong",{parentName:"p"},"With BloodConnect"),",\nit will notify nearby users and there is a call-to-action for donors to connect with the requester.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app"}),"Red Cross Connection"),", developed in 2014",Object(r.b)("br",{parentName:"p"}),"\n","This platform was developed by the Singapore Red Cross as a campaign, and was officially announced in January 2014.",Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-4"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-4",className:"footnote-ref"}),"4")),'\nIt shared similarities with BloodConnect, however, it is no longer operational. The app allows users to post the\n"number of lives they have saved" and view the "number of blood donations made by their peers".',Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-5"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-5",className:"footnote-ref"}),"5"))," We believe that\nthis feature does not value-add into the problem that the platform was aiming to tackle:\n",Object(r.b)("em",{parentName:"p"},"amplifying the search for donors"),".",Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-4"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-4",className:"footnote-ref"}),"4")),' Instead, this feature may make blood donation seemed competitive and users can\nshowcase the "',Object(r.b)("em",{parentName:"p"},"number of lives they have saved"),'". As a reward, blood donors may scan a QR code at donation sites to view an\nAR animation an an appreciation for their "selfless and heroic acts".',Object(r.b)("sup",Object(n.a)({parentName:"p"},{id:"fnref-6"}),Object(r.b)("a",Object(n.a)({parentName:"sup"},{href:"#fn-6",className:"footnote-ref"}),"6"))," While we agree with the campaign's message that\ndonating blood is a heroic act, the aim of BloodConnect's development is not as a campaign, but as a tool to solve the\nproblem with finding blood. That being said, as of now, we do not plan to take a gamified approach towards blood donation."))),Object(r.b)("h2",{id:"user-flow"},"User flow"),Object(r.b)("h2",{id:"project-log"},"Project Log"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"No"),Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Task"),Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Date"),Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Phillmont (hours)"),Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Ivan (hours)"),Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Remarks"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Project preparation"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"See remarks"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"20"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"6"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(r.b)("strong",{parentName:"td"},"Phillmont")," learnt the fundamentals of React Native, Redux, Firebase, Cloud Functions, continuous integrations, Node.js, and serverless RESTful APIs (May 11-18). ",Object(r.b)("br",null)," ",Object(r.b)("strong",{parentName:"td"},"Ivan")," learnt the fundamentals of JavaScript and React (May 18-22).")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Preparing poster, video, and proposal for mentor matching"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 13"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"6"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"http://bit.ly/BloodConnectPoster"}),"Click here for poster"),". ",Object(r.b)("br",null)," ",Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"http://bit.ly/BloodConnectVideo"}),"Click here for video"),". ",Object(r.b)("br",null)," ",Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"http://bit.ly/BloodConnectProposal"}),"Click here for proposal"),".")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Team Meeting 1: Briefing"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 18"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"4"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"4"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Ideation and discussion to solidify project proposal before meeting mentors. Also delegated roles for the project.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"4"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Meeting with Robin Loh"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 19"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Mentor matching. Discussed about the fundamentals of software development, documentation, testing, and project proposal.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"5"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Meeting with Leslie Ho"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 20"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Mentor matching. Discussed about project proposal and features. Also planned for expectations by Milestones 1 to 3.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"6"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Team Meeting 2: Thoughts"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 20"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Discussed about thoughts after meeting and exchanging emails with several mentors. We chose to continue with Leslie Ho.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"7"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Wireframing"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 23"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"7"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/bloodwork-nus/bloodconnect-docs/raw/master/static/misc/bloodconnect-mockup.pdf"}),"Click here for the wireframes designed so far"),".")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"8"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Continuous integration"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 25"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Integrated CircleCI and Jest to the ",Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/bloodwork-nus/bloodconnect/pull/1"}),"front-end app")," with temporary sample tests.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"9"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Team Meeting 3: Milestone"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 26"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Discussed about Milestone 1 submission and development roles.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"10"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Development: Intro screen"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 26"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"7"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Designed the assets (in SVG) and developed the intro page (see wireframe PDF page 1-3).")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"11"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Development: Login screen"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 27"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"10"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Developed the login screen and relevant components (e.g. buttons, text boxes, etc.).")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"12"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Development: Create account screen"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 28"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"5"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Developed the create account screen and fixed platform-specific problems with the components (e.g. ",Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/bloodwork-nus/bloodconnect/commit/34e9119f41e5bf262a47fa705410530097ebbd87"}),"keyboard pushing up view on Android"),", ",Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/bloodwork-nus/bloodconnect/commit/4d621abf069935db77b11a3fe4ca164aaa9a7c95"}),"shadows not appearing on iOS"),", etc).")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"13"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Development: Explore screen (Part 1)"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 28"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"7"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Developed the bottom bar with inlet floating action button and integration a scrollable animated bottom sheet.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"14"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Development: Explore screen (Part 2)"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 29"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"10"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Integrated Google Maps (on Android) and Apple Maps (on iOS), added my-location and user profile buttons, requests list view, and debugged weird bottom sheet layout and shadow issues.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"15"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Mission Control 3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 30"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"UI/UX Workshop Part 1. Ivan also watched the recording of the session. The recording was only made for our team only, will ",Object(r.b)("em",{parentName:"td"},"never")," be shared with anyone.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"16"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Team Meeting 4: Features"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 30"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Discussed about project scope, specific features, and BloodConnect's unique selling points. Also compared UI designs from other apps (e.g. Netflix, Gojek, Uber, etc.) with BloodConnect.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"17"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Deployed ",Object(r.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/bloodwork-nus/bloodconnect-docs"}),"BloodConnect Docs")," (this site!)"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"May 31"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Developed this site as a developers' documentation and project stories.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(r.b)("strong",{parentName:"td"},"Total hours")),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"92"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"25"),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(r.b)("p",null,"Total hours spent by both Orbitees: 92 + 25 = ",Object(r.b)("strong",{parentName:"p"},"117 hours"),"."),Object(r.b)("p",null,"See you in Milestone 2 \ud83d\udc4b!"),Object(r.b)("div",{className:"footnotes"},Object(r.b)("hr",{parentName:"div"}),Object(r.b)("ol",{parentName:"div"},Object(r.b)("li",Object(n.a)({parentName:"ol"},{id:"fn-1"}),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.hsa.gov.sg/blood-donation/blood-facts-and-figures"}),"https://www.hsa.gov.sg/blood-donation/blood-facts-and-figures"),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"#fnref-1",className:"footnote-backref"}),"\u21a9")),Object(r.b)("li",Object(n.a)({parentName:"ol"},{id:"fn-2"}),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.straitstimes.com/singapore/3000-blood-donors-needed-as-stocks-run-low"}),"https://www.straitstimes.com/singapore/3000-blood-donors-needed-as-stocks-run-low"),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"#fnref-2",className:"footnote-backref"}),"\u21a9")),Object(r.b)("li",Object(n.a)({parentName:"ol"},{id:"fn-3"}),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.tnp.sg/news/singapore/singapore-red-cross-concerned-over-lack-young-blood-donors"}),"https://www.tnp.sg/news/singapore/singapore-red-cross-concerned-over-lack-young-blood-donors"),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"#fnref-3",className:"footnote-backref"}),"\u21a9")),Object(r.b)("li",Object(n.a)({parentName:"ol"},{id:"fn-4"}),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.campaignasia.com/agencyportfolio/casestudy/200,red-cross-connection.aspx#.XtIaHjoza00"}),"https://www.campaignasia.com/agencyportfolio/casestudy/200,red-cross-connection.aspx#.XtIaHjoza00"),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"#fnref-4",className:"footnote-backref"}),"\u21a9")),Object(r.b)("li",Object(n.a)({parentName:"ol"},{id:"fn-5"}),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.todayonline.com/singapore/singapore-red-cross-launches-mobile-app-blood-donation"}),"https://www.todayonline.com/singapore/singapore-red-cross-launches-mobile-app-blood-donation"),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"#fnref-5",className:"footnote-backref"}),"\u21a9")),Object(r.b)("li",Object(n.a)({parentName:"ol"},{id:"fn-6"}),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app"}),"https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app"),Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"#fnref-6",className:"footnote-backref"}),"\u21a9")))))}s.isMDXComponent=!0},132:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return u}));var n=a(0),o=a.n(n);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var c=o.a.createContext({}),s=function(e){var t=o.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):b(b({},t),e)),a},d=function(e){var t=s(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(a),m=n,u=d["".concat(l,".").concat(m)]||d[m]||p[m]||r;return a?o.a.createElement(u,b(b({ref:t},c),{},{components:a})):o.a.createElement(u,b({ref:t},c))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,l=new Array(r);l[0]=m;var b={};for(var i in t)hasOwnProperty.call(t,i)&&(b[i]=t[i]);b.originalType=e,b.mdxType="string"==typeof e?e:n,l[1]=b;for(var c=2;c<r;c++)l[c]=a[c];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);