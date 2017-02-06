/*NodeJS file to fetch data from Triplestore for the List of Lectures Web page
Functionality:
*Loads the query
*Runs the query on Triplestore DB
*Formats the results, before returning them to the Frontend 
*/
exports.list = function(req, res) {
   var sparql = require('../sparql/adminqueries');

   var config = require('config');
   var storeConfig = config.get('Store');
   var sparqlendpoint = storeConfig.protocol + storeConfig.Credentials.user + ':' + storeConfig.Credentials.password + "@" + storeConfig.url + ":" + storeConfig.port + "/repositories/" + storeConfig.repository;

   var sparqlquery = sparql.adminquery.getAdmin;
   
   var IRI = "<http://clls.rbg.informatik.tu-darmstadt.de/clls/store/lecture/" + global.gadIRI + ">";

   var SparqlClient = require('sparql-client');
   var sparqlclient = new SparqlClient(sparqlendpoint);
   console.log("Hello");
   console.log(IRI);
   sparqlclient.query(sparqlquery).bind('lecturename',IRI).execute(function(error, result) {
      if (result == null) {
         console.log("ERROR: Could not query ratings " + error);
         res.json({
            response: 'error'
         });
      } else if (result) {
         var response = [];
         var bindings = result.results.bindings;
         for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            var lectureobj = {};
            lectureobj.title =  binding.title.value;
            lectureobj.module = binding.module.value;
            lectureobj.semester = binding.semester.value;
            lectureobj.date = binding.date.value;
            response.push(lectureobj);
         }
         res.json(response);
      }
   });
}
