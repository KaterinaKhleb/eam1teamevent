<template>
  <div class="main-form">
    <div style="position:fixed; width:30%">
       <h1>I am <input style="width:30%" placeholder="" v-model="nameInput" name="add-item" type='text'/> </h1> 
      <p>Today is {{date}}, {{week}} week of the year</p>
    </div>

      <div style="position:fixed; width:30; right:3%; display: flex">
       <h2 class="link" v-on:click="navigate('volleyball')" >Volleyball</h2>
       <h2 class="link" v-on:click="navigate('gamenight')"  >Game Night</h2>

    </div>
 



      <div class="form-holder">
          <form method="post" name="item-form" v-on:submit.prevent="newItem"  >
                <!-- <input placeholder="" v-model="addItemInput" name="add-item" type='text'/> -->
                    <br>
                <h3>and for the game night I say...</h3>
                  <div class="check-holder"> 
                

                 <div>
                    <input type="radio" id="in" v-model="fri"  name="color" value="in">
                  <label for="in"> <b>I AM IN!!!</b> </label>
                  <div v-for="person in inPeople" :key="person.index" >
                    <p> <img class="icon" src="../assets/iamin.png"> {{person}}</p>
                  </div>
                 </div>

                  <div class="display: flex">
                      <input type="radio" id="never" v-model="never"  name="color" value="never">
                    <label style="display:flex" for="never"> not this week <span style='font-size:20px; margin-left:7px'>&#128557;</span></label>
                    <div v-for="person in neverPeople" :key="person.index" >
                      <p><img class="icon" src="../assets/iamin.png"> {{person}}</p>
                    </div>
                  </div>
   
                </div>

                <div class="btns">

                <button v-on:click="saveVote()"  type="submit"> Save my vote </button>
                <button v-on:click="deleteVote()" > Delete my vote </button>
                </div>

            </form>

      </div>
      <img  src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves"  width=80/>
  </div>
</template>

<script>
import axios from "axios"
import router from '../router'

export default {
  name: 'mainForm',

    data () {
            return {
                name: '',
                addItemInput: "",
                addItemColor:"",
                in: false,  
                never: false,
                nameInput: "",
                date: "",
                week: Number,
                inPeople: [],
                neverPeople: [],
                currentPage: "gamenight"
            }
        },
  computed: {
      
  },
  methods: {
      newItem: function(){
            let payload = {
                name: this.addItemInput,
              color: this.addItemColor,
            };
           console.log(payload)
      },

      saveVote() {
        let payload = {}
        payload.name = this.nameInput
        payload.vote = ""
        if (this.in) { 
          payload.vote = "in"
          }
        if (this.never) { 
            payload.vote = "never"
          }
       
        payload.week = this.week

        axios.post("/savegamevote", payload)
    
      },

      deleteVote() {
        let payload = {}
        payload.name = this.nameInput
        axios.post("/deletegamevote", payload)
        this.$nextTick(() => {
          window.location.reload()
        })

      },

      navigate(page) {
        router.push({ name: page});
        this.currentPage = page
      }
  }, 
   async created(){

      let now = new Date();
      let date = now.getDate() + "." + (now.getMonth()+1) + "." + now.getFullYear()

      this.date = date
      let onejan = new Date(now.getFullYear(), 0, 1);
      let week = Math.ceil( (((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );
      this.week = week

      const response = await axios.post("/gamevotes", {week: week})
      const votes = response.data

      
      for (let vote of votes){
        console.log(vote.name)
        if (vote.vote === "in") {this.inPeople.push(vote.name)}
        if (vote.day === "never") {this.neverPeople.push(vote.name)}
        
      }
        },
}
</script>


<style scoped>
.form-holder{
      display: flex;
      flex-direction: column
    }


input[type=text]{
  border: 0;
   padding: 30px; 
   border: 2px solid transparent; 
   border-bottom-color: black; 
   transition: 0.4s;
   background: none;
   outline: none;
   width:15%;
   text-align: center;
   height:40px;
   margin-top:1%;
   font-size: 26px
  }

input:focus{
   transition: 0.4s;
   border:2px solid black
   }

.check-holder {
  display: flex;
  width: 50%;
  margin: 30px auto;
  justify-content: space-around
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: black;
    margin:auto;
    padding-bottom:5px;
    
}
#never + label {
    border: 2px solid #ffccff;
    padding:5px 15px 0px 40px;
    background: #ffccff
}
#in + label {
    border: 2px solid #cfc;
    padding:5px 15px 0px 40px;
    background: #cfc
}


[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    background: transparent;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 22px;
    height: 22px;
    background: black;
    position: absolute;
    top: 0px;
    left: 0px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}

[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

button {
  background: none;
  padding: 7px;
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  width: 30%;
  margin: 10px auto;
  border: 2px solid black;
	transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);	
	cursor: pointer;
	user-select: none;
  outline: none
}

button:hover{
  background: black;
  color:lightgray
}
.btns{
  display: flex;
  margin: auto ;
  width: 60%;
  justify-content: space-around
}
.icon {
  width: 20px;
  height: auto;
}
#volik {
  width: 50%;
  height: auto;
}

#ball {
  transform: translateX(-50%) translateY(-15%)
}
#hooman1 {
  animation: jump 4s 1.9s ease-in-out infinite
}
#hooman2 {
  animation: jump 4s 3.9s ease-in-out infinite
}
@keyframes jump {
  2% {
    transform: translateY(-15%)
  }
  15% {
    transform: translateY(0)

  }
  100% {
    transform: translateY(0)

  }
}
#ballpath {
  fill: black
}

.link:hover {
cursor: pointer;
}
.link:nth-of-type(2){
  padding-bottom: 10px;
  transform: scale(1.2);
  border-bottom: 2px solid black;
  margin-left: 40px
}
</style>
