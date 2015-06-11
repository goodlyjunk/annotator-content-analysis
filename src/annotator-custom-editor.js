function annotatorCustomEditor(options){
  return {
    start: function() {
      this.options = options;
      this.getDataPayload();
    },

    // ajax get to retrieve data
    getDataPayload: function(){
      if (typeof this.options.data !== "object") {
        $.get(this.options.data, (data) => {
          this.setData(data);
        })
      } else {
        this.setData(this.options.data);
      }
    },

    // method to cast our data payload into module's context
    // @param value [object] API payload returned via AJAX
    //
    setData: function(value){
      this.data = {
        next: value.next,
        previous: value.previous,
        glossary: value.results[0].analysis_type.glossary
      }
    },

    // this is where the DOM fun begins...
    // TODO: create DOM template function to pipe in our question tree
    setUpCustomEditorPanel: function(annotation) {
      // we will eventually return the annotation after our question tree logic has been navigated
      return annotation
    },

    // helper promise function for intercepting Annotator UI
    //
    promiseHelper: function(annotation) {
      return new Promise((resolve, reject) => {
        let value = annotation
        resolve(value); // we won't want to resolve this right away, but instead perhaps pipe a callback to run first then resolve
      })
    },

    // ANNOTATOR LIFECYCLE EVENTS
    //
    beforeAnnotationCreated: function(annotation){
      return this.promiseHelper(annotation)
        .then((value) => {
          this.setUpCustomEditorPanel(value);
        });
    },


    annotationCreated: function(annotation) {
      return annotation
   }

  }
}
