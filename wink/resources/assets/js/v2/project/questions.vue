<template>

  <div class="overlay">
    <div class="overlay__back" v-on:click="back">
      <img src="/images/back-button.svg" alt="Back image">
    </div>
    <div class="overlay__close" v-on:click="close">
      <img src="/images/close-outline.svg" alt="Close image">
    </div>
    <div class="overlay__content">

      <!-- Question Types Selector -->
      <ul class="questions__menu">
        <li><img v-on:click="addQuestionType(1)" class="questions__menu-item"
         src="/images/question-text.svg"></li>
         <li><img v-on:click="addQuestionType(2)" class="questions__menu-item"
           src="/images/question-multiple.svg"></li>
            <li><img v-on:click="addQuestionType(4)" class="questions__menu-item"
           src="/images/question-multiple-select.svg"></li>
           <li><img v-on:click="addQuestionType(6)" class="questions__menu-item"
             src="/images/question-image.svg"></li>
             <li><img v-on:click="addQuestionType(7)" class="questions__menu-item"
               src="/images/question-yesno.svg"></li>
               <li><img v-on:click="addQuestionType(8)" class="questions__menu-item"
                 src="/images/question-rating.svg"></li>
                 <li><img v-on:click="addQuestionType(9)" class="questions__menu-item"
                   src="/images/question-barcode.svg">
                 </li>
                 <li><img v-on:click="addQuestionType(10)" class="questions__menu-item"
                   src="/images/question-gps.svg"></li>
                   <li><img v-on:click="addQuestionType(11)" class="questions__menu-item"
                   src="/images/question-number.svg"></li>
                   <li><img v-on:click="addQuestionType(12)" class="questions__menu-item"
                   src="/images/question-calc.svg"></li>
                 </ul>

                 <div class="row">
                  <div class="col-sm-12">
                    <div class="overlay__heading">Design a questionnaire</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="overlay__sub-heading">Create a custom list of questions for your teams to complete</div>
                  </div>
                </div>
                <hr>
                <div class="questions">
                  <h4>Questions</h4>

                  <div v-if="questions.length < 1" class="questions__empty">Select a question type on the left to start
                  </div>

                  <!--<draggable v-model="questions" @end="dragEnd">-->
                  <template v-for="(question, index) in questions">

                    <template v-if="question && question.input_type">
                      <template v-if="question.input_type == 1">
                        <div v-bind:class="{ focus: question.isActive }"
                        class="questions__input questions__text">
                        <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                        <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                        <div class="questions__wrap">
                          <img src="/images/question-text.svg">
                          <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                          type="text"
                          placeholder="Add a question or task">
                        </div>
                        <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                      </div>
                    </template>
                    <template v-if="question.input_type == 11">
                        <div v-bind:class="{ focus: question.isActive }"
                        class="questions__input questions__text">
                        <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                        <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                        <div class="questions__wrap">
                          <img src="/images/question-number.svg">
                          <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                          type="text"
                          placeholder="Add a question or task">
                        </div>
                        <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                      </div>
                    </template>
                     <template v-if="question.input_type == 12">
                        <div v-bind:class="{ focus: question.isActive }"
                        class="questions__input questions__text">
                         <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                        <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                        <div class="questions__wrap">
                          <img src="/images/question-calc.svg">
                          <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                          type="text"
                          placeholder="Add a question or task">
                          <span style="     margin: 8px 10px 0px;
    float: right;
    width: 180px; text-align: right">
                          Calculation: <select v-model="question.calc_type" style="    height: 30px; padding: 3px; margin-bottom: 0px; width: 120px    border: 1px solid #CCC;">
                            <option>+</option>
                            <option>-</option>
                            <option>*</option>
                            <option>/</option>
                          </select>
                        </span>
                        </div>
                        <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                      </div>
                    </template>

                    <template v-if="question.input_type == 2">
                      <div v-bind:class="{ focus: question.isActive }"
                      class="questions__input questions__multiple">
                        <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                      <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                      <div class="questions__wrap">
                        <img src="/images/question-multiple.svg">
                        <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                        type="text"
                        placeholder="Add a question or task">
                        <img v-if="!question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/close-arrow.svg">
                        <img v-if="question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/down-arrow.svg">
                      </div>

                      <!-- Options -->
                      <div v-for="(option, optionIndex) in question.options" v-if="question.show_options" class="multiple-option">
                        <span class="multiple-option__tickbox"></span>
                        <template v-if="question.options.length === 1">
                          <input v-model="option.name"
                          v-on:keyup="hasContent(index, optionIndex, option.name)" ref="{{question.id}}"
                          v-on:focus="hasFocus(question.id)" type="text"
                          placeholder="Add an option">
                          <input type="text" v-on:focus="hasFocus(question.id)" v-on:blur="calculateMax()"  ref="{{question.id}}" v-model="option.score" class="questions__scoring">
                        </template>
                        <template v-else>
                          <input v-model="option.name"
                          v-on:keyup="hasContent(index, optionIndex, option.name)" ref="{{question.id}}"
                          v-on:focus="hasFocus(question.id)" type="text"
                          placeholder="Add another option">
                          <input type="text" v-on:focus="hasFocus(question.id)"  ref="{{question.id}}" v-on:blur="calculateMax()" v-model="option.score" class="questions__scoring">
                        </template>
                        

                      </div>
                         <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                    </div>
                  </template>
                     <template v-if="question.input_type == 4">
                      <div v-bind:class="{ focus: question.isActive }"
                      class="questions__input questions__multiple">
                         <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                      <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                      <div class="questions__wrap">
                        <img src="/images/question-multiple-select.svg">
                        <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                        type="text"
                        placeholder="Add a question or task">
                         <img v-if="!question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/close-arrow.svg">
                        <img v-if="question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/down-arrow.svg">
                      </div>

                      <!-- Options -->
                      <div v-for="(option, optionIndex) in question.options" v-if="question.show_options" class="multiple-option">
                        <span class="multiple-option__tickbox"></span>
                        <template v-if="question.options.length === 1">
                          <input v-model="option.name"
                          v-on:keyup="hasContent(index, optionIndex, option.name)" ref="{{question.id}}"
                          v-on:focus="hasFocus(question.id)" type="text"
                          placeholder="Add an option">
                           <input type="text"  ref="{{question.id}}" v-on:focus="hasFocus(question.id)" v-on:blur="calculateMax()" v-model="option.score" class="questions__scoring">
                        </template>
                        <template v-else>
                          <input v-model="option.name"
                          v-on:keyup="hasContent(index, optionIndex, option.name)" ref="{{question.id}}"
                          v-on:focus="hasFocus(question.id)" type="text"
                          placeholder="Add another option">
                           <input type="text"  ref="{{question.id}}" v-on:focus="hasFocus(question.id)" v-on:blur="calculateMax()" v-model="option.score" class="questions__scoring">
                        </template>

                      </div>
                      <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                    </div>
                  </template>

                  <template v-if="question.input_type == 6">
                    <div v-bind:class="{ focus: question.isActive }"
                    class="questions__input questions__image">
                       <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                       <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                    <div class="questions__wrap">
                      <img src="/images/question-image.svg">
                      <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                      type="text"
                      placeholder="Add a question or task">
                    </div>
                     <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                  </div>
                </template>

                <template v-if="question.input_type == 7">
                  <div v-bind:class="{ focus: question.isActive }"
                  class="questions__input questions__yesno">
                   <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                        <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                  <div class="questions__wrap">
                    <img src="/images/question-yesno.svg">
                    <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                    type="text"
                    placeholder="Add a question or task">
                     <img v-if="!question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/close-arrow.svg">
                        <img v-if="question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/down-arrow.svg">
                  </div>

                  <!-- Options -->
                  <div v-for="(option, optionIndex) in question.options" v-if="question.show_options" class="multiple-option">
                        <span class="multiple-option__tickbox"></span>
                     
                        <template>
                          <input v-model="option.name"
                          v-on:keyup="hasContent(index, optionIndex, option.name)" ref="{{question.id}}"
                          v-on:focus="hasFocus(question.id)" type="text"
                          placeholder="Add another option">
                           <input type="text" v-on:focus="hasFocus(question.id)"  ref="{{question.id}}" v-on:blur="calculateMax()" v-model="option.score" class="questions__scoring">

                        </template>

                      </div>
                   <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
                </div>
              </template>

              <template v-if="question.input_type == 8">
                <div v-bind:class="{ focus: question.isActive }"
                class="questions__input questions__rating">
                   <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                     <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
                <div class="questions__wrap">
                  <img src="/images/question-rating.svg">
                  <input v-on:focus="hasFocus(question.id)" v-model="question.question"
                  type="text"
                  placeholder="Add a question or task">
                   <img v-if="!question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/close-arrow.svg">
                        <img v-if="question.show_options" class="questions__show_options" v-on:click="toggleshow_options(index, question.show_options)" src="/images/down-arrow.svg">
                </div>
                <!-- Options -->
                    <div v-for="(option, optionIndex) in question.options" class="multiple-option" v-if="question.show_options">
                        <span class="multiple-option__tickbox"></span>
                     
                        <template>
                          <input v-model="option.name"
                          v-on:keyup="hasContent(index, optionIndex, option.name)" ref="{{question.id}}"
                          v-on:focus="hasFocus(question.id)" type="text"
                          placeholder="Add another option">
                           <input type="text"  ref="{{question.id}}" v-on:focus="hasFocus(question.id)" v-on:blur="calculateMax()" v-model="option.score" class="questions__scoring">
                        </template>

                      </div>
                 <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
              </div>
            </template>

            <template v-if="question.input_type == 9">
              <div v-bind:class="{ focus: question.isActive }"
              class="questions__input questions__barcode">
                <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
                     <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">  
                        <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
              <div class="questions__wrap">
                <img src="/images/question-barcode.svg">
                <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
                type="text"
                placeholder="Add a question or task">
              </div>
               <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
            </div>
          </template>

          <template v-if="question.input_type == 10">
            <div v-bind:class="{ focus: question.isActive }"
            class="questions__input questions__gps">
              <img v-on:click="removeQuestion(question.id)" src="/images/question-cancel.svg" class="questions__cancel">
             <img v-if="!question.required" src="/images/approved.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">
                        <img v-if="question.required" src="/images/approve.png" v-on:click="toggleQuestionRequired(index, question.required)" class="questions__required">       
              <img v-on:click="toggleQuestionDescription(index, question.show_desc)" src="/images/info.png" class="questions__info">
            <div class="questions__wrap">
              <img src="/images/question-gps.svg">
              <input v-on:focus="hasFocus(question.id)" v-model="question.question" ref="{{question.id}}"
              type="text"
              placeholder="Add a question or task">
            </div>
             <textarea v-if="question.show_desc" v-on:focus="hasFocus(question.id)" v-model="question.prompt" ref="{{question.id}}"
                          type="text"
                          placeholder="Optional description..." class="questions__prompt"></textarea>
          </div>
        </template>
      </template>

    </template>
    <!--</draggable>-->

  </div>
  <p>Set Benchmark:  <input type="text" style="float:none !important" v-model="benchmark" class="questions__scoring"> / <span>{{max_score}}</span> (max)</p>
  <hr>
  <button v-bind:disabled="questions.length < 1" v-bind:class="{disabled: questions.length < 1}"
  v-on:click="saveQuestions" class="btn btn--blue btn-block">Save + return
</button>
</div>
</div>

</template>

<script>

  import moment from 'moment';
  import draggable from 'vuedraggable';

  export default {
    props: {
      selectedCampaign: {type: Object}
    },
    components: {
      draggable,
    },
    data() {
      return {
        questionHasFocus: null,
        questions: [],
        benchmark: 0,
        max_score: 0,
        clean_questions: []
      }
    },
    mounted() {
      this.clean_questions = (this.selectedCampaign.questions) ? this.selectedCampaign.questions : [];
      this.questions = [];
      
      this.max_score = 0;
      this.benchmark = this.selectedCampaign.benchmark_score;
      this.prepQuestions();
      this.calculateMax();
      console.log(this.questions);
    },
    methods: {

      close: function () {
        this.$emit('close');
      },
      back: function () {
        this.$emit('back');
      },

      addQuestionType: function (type) {
        let question = {
          id: Date.now(),
          isActive: false,
          required: true,
          question: '',
          prompt: '',
          input_type: type,
          options: false,
          alert: false,
          calc_type: '',
          show_desc: false,
          show_options: false
        };

        if (type === 2 || type === 4) {
          question.options = [{name: "", score: ""}];
        }

        if (type === 7) {
          question.options = [{name: "Yes", score: ""}, {name: "No", score: ""}];
        }

        if (type === 8) {
          question.options = [{name: "1", score: ""},{name: "2", score: ""},{name: "3", score: ""},{name: "4", score: ""},{name: "5", score: ""}];
        }

        this.questions.push(question);
      },

      prepQuestions: function(){
          var i = 0;
          for (i = 0; i < this.clean_questions.length; i++) { 
               let question = {
                        id: Date.now(),
                        isActive: false,
                        required: this.clean_questions[i].required,
                        question: this.clean_questions[i].question,
                        prompt: this.clean_questions[i].prompt,
                        input_type: this.clean_questions[i].input_type,
                        options: this.clean_questions[i].options,
                        alert: this.clean_questions[i].alert,
                        calc_type: '',
                        show_desc: false,
                        show_options: false
                      };

              this.questions.push(question);
          }

      },

      removeQuestion: function(id){
        this.questions = this.questions.filter((qu) => {
          return qu.id !== id;
        });
      },

      hasFocus: function (id) {
        // set all questions isActive to false
        this.questions.forEach((el) => {
          el.isActive = (el.id === id);
        });

      },

      dragEnd: function(){
        //this.questions = this.questions.filter((n) => { return n !== undefined });
      },

      hasContent: function (question, optionIndex, content) {
        // if there is content and the next item does not exist
        if (content.length > 0 && !this.questions[question].options[optionIndex + 1]) {
          this.questions[question].options.push({name: "", score: ""});
        } else if (content.length === 0) {
          this.questions[question].options.splice(optionIndex + 1, 1);
        }
      },

      calculateMax: function (){
   
          this.max_score = 0;
          let i = 0;
          for (i = 0; i < this.questions.length; i++) { 
            let maxscore = 0;
            if(this.questions[i].options){
              let ii = 0;
              for (ii = 0; ii < this.questions[i].options.length; ii++) {  
                if(this.questions[i].input_type != 4){               
                  if(maxscore < parseInt(this.questions[i].options[ii].score)){
                    maxscore = parseInt(this.questions[i].options[ii].score);                    
                  }
                }else{
                  if(parseInt(this.questions[i].options[ii].score) > 0){
                    this.max_score += parseInt(this.questions[i].options[ii].score);                    
                  }
                  
                }
               }
             }

             this.max_score += parseInt(maxscore);
          }
      },

      saveQuestions: function () {

        for (var q in this.questions) {

          console.log(this.questions[q]);

          // if(this.questions[q].input_type == '2' || this.questions[q].input_type == '4'){
          //   if(this.questions[q].options.length == 0){
          //     alert("Error: Please ensure all multi-choice questions have at least one available option.");
          //     return false;
          //   }else if(this.questions[q].options.length == 1){
          //     if(this.questions[q].options[0].name == ''){
          //       alert("Error: Please ensure all multi-choice questions have at least one available option.");
          //       return false;
          //     }
          //   }

          // }
        }

        axios.put(`/campaigns/update/` + this.selectedCampaign.id, {
                    benchmark: this.benchmark,
                    max_questionnaire_score: this.max_score
                });
        
        axios.post(`/questions/store/${this.selectedCampaign.id}`, this.questions)
        .then(response => {
            // Find the request by id
            console.log(response.data);
            this.$emit('close', response.data.data);
          });
      },

      toggleQuestionDescription: function (question, show_desc){
          if(show_desc){
            this.questions[question].show_desc = false;
          }else{
            this.questions[question].show_desc = true;
          }
      },

      toggleQuestionRequired: function (question, required){
          if(required){
            this.questions[question].required = false;
          }else{
            this.questions[question].required = true;
          }
      },

      toggleshow_options: function (question, show_options){
        if(show_options){
            this.questions[question].show_options = false;
          }else{
            this.questions[question].show_options = true;
          }
      }

    }
  }
</script>