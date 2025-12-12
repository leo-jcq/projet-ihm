<script setup lang="ts">
//import { defineProps, defineEmits } from 'vue'
import { getAssetPath } from '@/utils/files';
import type { User } from '@/types/model';


type Msg = {
  id: number
  name: string
  avatar: string
  handle?: string
  text: string
  time: string
  unread?: boolean
}

const props = defineProps<{ message: Msg, user: User }>();

const emit = defineEmits<{
  (e: 'open', id: number): void
}>()

function open() {
  emit('open', props.message.id)
}
</script>

<template>
  <article class="message-card" :class="{ unread: message.unread }" @click="open">
    <div class="left">
      <div class="avatar">
        <!-- <img :src="getAssetPath(user.avatar)" :alt="user.pseudo" class="user-modal__avatar" /> -->
    </div>
      <div class="meta">
        <div class="name">{{ message.name }}</div>
        <div class="text">{{ message.text }}</div>
      </div>
    </div>

    <div class="right">
      <div class="time">{{ message.time }}</div>
      <div class="dot" v-if="message.unread" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.message-card{
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 14px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(16,24,40,0.06);
  cursor: pointer;
  .left{
    display:flex;
    gap:12px;
    align-items:center;
    .avatar{
      width:48px;height:48px;border-radius:50%;
    }
    .meta{
      .name{ font-weight:700; font-size:14px }
      .text{ color:#9aa0a6; font-size:13px; margin-top:4px }
    }
  }
  .right{
    text-align:right;
    .time{ color:#9aa0a6; font-size:12px; margin-bottom:6px }
    .dot{ width:12px;height:12px;background:#ff6b00;border-radius:50%; margin:0 auto }
  }
}
.message-card.unread{ border-left:4px solid #ff6b00 }
</style>