function annotatorCustomEditor(options){
  return {
    start: function() {
      this.options = options;
      this.getDataPayload();

    },

    _events: function() {
      $('.submit').on('click', (e) => {
        console.log($('form').serialize())
        return false
      })
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
        analysis_type: value.results[0].analysis_type
      }
    },

    // returns a promise that isn't resolved until our survey is complete
    //
    createSurvey: function(annotation) {
      return new Promise((resolve, reject) => {
        this.topics = []
        this.data.analysis_type.topics.forEach(this.setTopics.bind(this));
        this.topics = this.topics.join('')
        this.survey = `<form class="survey-unit">${this.topics}<button class="submit">SUBMIT</button></form>`

        $('body').append(this.survey)
        this._events()
        resolve(annotation);
      })
    },

    setTopics: function(element, index, array) {
      this.questions = [];
      element.questions.forEach(this.setQuestions.bind(this));
      this.questions = this.questions.join('')
      this.topics.push(`<div class="survey-unit__topic"><a class="btn btn-primary" role="button" data-toggle="collapse" href="#topic-${element.topic_id}" aria-expanded="false" aria-controls="topic-${element.topic_id}">${element.name}</a><div class="collapse" id="topic-${element.topic_id}">${this.questions}</div></div>`)
    },

    setQuestions: function(element, index, array) {
      this.answers = [];
      element.answers.forEach(this.setAnswers.bind(this, element.id));
      this.answers = this.answers.join('')
      this.questions.push(`<li class="survey-unit__question">${element.text}${this.answers}</li>`)
    },

    setAnswers: function(parentId, element, index, array) {
      this.answers.push(`<input class="survey-unit__answer" type="radio" name="${parentId}" value="${element.id}">${element.text}</input>`)
    },


    postResults: function(annotation) {
      console.log('postResults');
    },

    // ANNOTATOR LIFECYCLE EVENTS
    //
    beforeAnnotationCreated: function(annotation){
      return this.createSurvey(annotation)
        .then((annotation) => {
          this.postResults(annotation);
        });
    },


    annotationCreated: function(annotation) {
      return annotation
   }

  }
}
