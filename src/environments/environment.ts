// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export 
const environment = {
  production: false,


  // DEV envorment
  accessToken: "http://192.168.1.13:9999",
  // periously used for email template and common master  // currently code  is not available from back end ==>  baseUrl: "http://192.168.1.11:8050",

  performance:  "http://192.168.1.13:9999/"
              
  // // STAGE envorment
  // accessToken: "http://192.168.1.11:9040",
  // // periously used for email template and common master  // currently code not available from back end   baseUrl: "http://192.168.1.11:8050",
  // baseUrl: "http://192.168.1.11:9050",
  // baseUrlNM: "http://192.168.1.11:9060/number-management",
  // baseUrlPM: "http://192.168.1.11:9050/product-management",
  // baseUrlUM: "http://192.168.1.11:9040",
  // emailFileUpload:"http://192.168.1.11:9020"

  /*


  //  envorment
  accessToken: "http://114.143.224.42:8040",
  baseUrl: "http://114.143.224.42:8050",
  baseUrlNM: "http://114.143.224.42:8060/number-management",
  baseUrlPM: "http://114.143.224.42:8050/product-management",
  baseUrlUM: "http://114.143.224.42:8040",
  emailFileUpload:"http://114.143.224.42:8020"
  */

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
