var adminquery2 = {};
adminquery2.getModules =
"select ?module"+"\n"+ 
"where{"+"\n"+
"?module <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/clls/module#Module> "+"\n"+"}";

module.exports.adminquery2 = adminquery2;

