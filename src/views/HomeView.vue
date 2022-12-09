<template>
  <div class="">
    <headerVue></headerVue>
    <mainpageVue></mainpageVue>
    <div class="float flex justify-center items-center">
      <v-btn @click="OpenChat" v-if="!open" icon size="large"
        ><v-icon>mdi-message</v-icon></v-btn
      >
      <div
        v-if="!open"
        class="notf flex flex-col justify-center items-center rounded border-black border-2 border-solid"
      >
        <span class="text-sm text-black">Need Assitance ?</span>
        <span class="text-xs text-black">Chat with food bot</span>
      </div>
    </div>
    <v-dialog v-model="chat" class="" max-width="490">
      <div class="dialogg bg-white px-5 py-6">
        <div class="container-sm around message-wrap">
          <div class="message" v-for="(i, index) in chats" :key="index">
            <div
              class="flex pa-4"
              :class="i.userId == 'user' ? 'flex-row-reverse' : ''"
            >
              <Avatar class="mt-1" />
              <div
                class="px-8 py-2 cover rounded flex flex-col"
                :class="i.userId == 'user' ? 'bg-green-800' : 'bg-gray-700'"
              >
                <p class="ma-0 pa-0 text-white">{{ i.message }}</p>
                <div
                  class="flex flex-col justify-start items-start"
                  v-if="i.options"
                >
                  <v-btn
                    @click="UserMessage(opt)"
                    size="small"
                    variant="outlined"
                    class="ma-0 pa-0 mb-1 px-2 text-white"
                    v-for="(opt, index) in i.options"
                    :key="index"
                    >{{ opt }}</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="orderBox"
            class="orderbox flex flex-col justify-center items-center"
          >
            <p class="ma-0 pa-0 font-bold">Tracking Order For {{ transRef }}</p>
            <p class="ma-0 pa-0 font-bold">
              Order Status For: {{ currentOrder }}
            </p>
            <p class="ma-0 pa-0 text-primary text-base">
              Status: {{ orderStatus }}
            </p>
          </div>
        </div>
        <div class="bottom fixed bottom-0 left-0 w-full">
          <div class="w-full">
            <v-form class="w-full flex justify-between">
              <input
                v-model="dform.message"
                class="px-3 input w-100 text-input"
                placeholder="Send a message"
                required
              />
              <v-btn
                color="blue"
                class="btnss rounded-none"
                @click="SendMessage"
                ><v-icon color="white">mdi-send</v-icon></v-btn
              >
            </v-form>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import headerVue from "@/components/header.vue";
import mainpageVue from "@/components/mainpage.vue";
import { ChatBot } from "@/AICHATBOT/dialogflow";
export default defineComponent({
  name: "HomeView",
  components: {
    headerVue,
    mainpageVue,
  },
  created() {},
  data: () => ({
    type: "default",
    chat: false,
    open: false,
    transRef: "MTR" + Math.floor(Math.random() * 907947904292),
    loading: false,
    orderStatus: "",
    currentOrder: "",
    orderBox: false,
    orderInfo: [
      "Preparing the order",
      "Packaging the order",
      "Shiping the order",
      "Delivered",
    ],
    dform: {},
    interval: 0,
    chats: [],
  }),
  methods: {
    prepareOrder() {
      let i = 0;
      this.orderStatus = "Pending";
      setInterval(() => {
        if (i == this.orderInfo.length) {
          clearInterval(this.interval);
        } else {
          this.orderStatus = this.orderInfo[i];
          i += 1;
        }
      }, 8000);
    },
    async TryIt(message) {
      try {
        let res = await ChatBot(message);
        let data = await res.json();
        let finalResponse = data.queryResult.fulfillmentMessages[0].payload;
        this.ChatBotMessage(finalResponse);
        if (
          (finalResponse.message == finalResponse.message) ==
            "You want Rice and Beans With Bottle Coke. That Costs ₦5000" ||
          finalResponse.message ==
            "You want Semo and Egusi. That Costs ₦8000" ||
          finalResponse.message ==
            "You want Jollof Rice with Red Wine. That Costs ₦3000"
        ) {
          this.transRef = "MTR" + Math.floor(Math.random() * 907947904292);
          this.currentOrder = finalResponse.message;
        }
        if (
          finalResponse.message ==
          "We have placed your order. You can track your order by saying track order"
        ) {
          this.prepareOrder();
          return;
        }
        if (finalResponse.message == "Tracking Current Order") {
          if (this.currentOrder == "") {
            this.ChatBotMessage({ message: "You have no Current Order" });
            return;
          } else {
            this.orderBox = true;
            return;
          }
        }
        if (finalResponse.message == "Your Current order has being cancled") {
          this.currentOrder = "";
          this.orderStatus == "";
          clearInterval(this.interval);
          this.orderBox = false;
          return;
        }
      } catch (err) {
        console.log(err);
        ChatBotMessage({message: err, options:['gcloud auth print-access-token']})
      }
    },
    OpenChat() {
      this.chat = true;
      this.TryIt("Hello");
    },
    SendMessage() {
      if (!this.dform.message == "") {
        this.orderBox = false;
        this.UserMessage(this.dform.message);
      }
    },
    UserMessage(message) {
      console.log(message);
      if (
        message == "Rice and beans with Bottle Coke" ||
        message == "Semo and Egusi Soup" ||
        message == "Jollof Rice with Red Wine" ||
        message ==
          "You want Rice and Beans With Bottle Coke. That Costs ₦5000" ||
        message == "You want Semo and Egusi. That Costs ₦8000" ||
        message == "You want Jollof Rice with Red Wine. That Costs ₦3000"
      ) {
        this.transRef = "MTR" + Math.floor(Math.random() * 907947904292);
        this.currentOrder = message;
      }
      this.dform.message = message;
      this.dform.userId = "user";
      this.chats.push(this.dform);
      this.TryIt(this.dform.message);
      this.dform = {};
    },
    ChatBotMessage(message) {
      this.dform = message;
      this.dform.userId = "";
      this.chats.push(this.dform);
      this.dform = {};
    },
  },
});
</script>
<style scoped>
.dialogg {
  height: 70vh !important;
  position: relative;
}
.warp {
  overflow: hidden !important;
}
.float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
}

.cover {
  border-top-left-radius: 0px !important;
}
.float .notf {
  position: absolute;
  top: 9%;
  left: -280%;
  height: 90%;
  transform: translate(200, -10%);
  width: 150px;
}
.message-wrap {
  height: 95%;
  overflow: hidden;
  overflow-y: scroll;
}
.message-wrap::-webkit-scrollbar {
  width: 8px;

  background: white;
}
.message-wrap::-webkit-scrollbar-thumb {
  background: green;
}
.my-float {
  margin-top: 16px;
}

.text-input {
  background: rgba(46, 42, 42, 0.623);
  color: white;
}
.text-input::placeholder {
  color: white;
  outline: none;
}

.btnss {
  border: 0 !important;
}
</style>
