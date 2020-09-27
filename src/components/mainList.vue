
<template>
  <div class="main-list">
            <ul  class="list"  >
                <li class="one-item"  >
                    <div  class="row" >
                        <div class="check-holder"></div> 
                        <div class="span-holder">
                                 <span class="line">ice cream </span>
                    </div>

              </div>  

           </li>
                <li class="one-item"  >
                    <div  class="row" >
                        <div class="check-holder"></div> 
                        <div class="span-holder">
                                 <span class="line">ice cream </span>
                    </div>

              </div>  

           </li>
          
            </ul>
  </div>
</template>

<script>
export default {
  name: 'mainList',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.list {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  margin: 2% auto;
  width: 80%;
  max-height: 80%;
  border: 1px solid #dedede;
  overflow-y: hidden;
  position: relative;
}

.one-item {
  list-style: none;
  border-bottom: 1px dotted black;
  height: auto;
  background: white;
  text-transform: capitalize;
  text-align: left;
  display: flex;
  width: 100%
}
.list li:hover {
  background:none;
}
li span {
  margin-left: 3px;
  display: inline-block;
position: relative;
transition: all 0.5s cubic-bezier(.55, 0, .1, 1);
  padding:18px;
}
.row {
  width: 100%;
  display: flex;
  height: fit-content;
}
.check-holder{
    max-width:60px;
    margin: auto;
    height: auto;
    padding: 15px 15px
}
.span-holder {
width: 90%;
padding-left: 15px;
display: flex;
border-left: 1px solid red
}
</style>
