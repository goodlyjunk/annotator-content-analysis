function annotatorCustomEditor(options){
  return {
    start: function() {
      this.options = options;
      this.getDataPayload()
    },

    beforeAnnotationCreated(annotation){
      // TODO: explore how annotator instantiates its UI and build from there.
      console.log('beforeAnnotationCreated')
    },

    // ajax json promise function to retrieve data
    getDataPayload() {
      return this.jsonPromise(this.options.endpoint)
        .then((value) => {
            this.configureData(value);
          }
        )
    },

    // method to model our raw data payload
    // @param value [object] API payload returned via AJAX
    //
    configureData(value){
      // TODO: establish how we want to configure the data
      this.data = {
        next: value.next,
        previous: value.previous,
        glossary: value.results[0].analysis_type.glossary
      }
    },

     // helper promise function for getDataPayload()
     // @param url [string] data endpoint to resolve
     //
    jsonPromise(url) {
      return new Promise((resolve, reject) => {
        let json = $.ajax(url);
        resolve(json)
      })
    }

  }
}
