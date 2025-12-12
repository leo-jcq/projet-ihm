<script setup lang="ts">
import { ref, computed } from 'vue'
import Msg from '@/components/Messages/Message.vue'
import messagesData from '@/data/messages.json'

type Message = {
  id: number
  name: string
  avatar: string
  handle?: string
  text: string
  time: string
  unread?: boolean
}

const tabs = ['Tout', 'Non lus', 'Epinglés', 'Masqués']
const activeTab = ref('Tout')
const messages = ref<Message[]>(messagesData as Message[])

function setTab(t: string) {
  activeTab.value = t
}

function openMessage(id: number) {
  const m = messages.value.find(x => x.id === id)
  if (m) m.unread = false
  // TODO : redirection vers la page discussion
}
</script>

<template>
  <div class="messages-page">
    

      <main class="main">
        <div class="tabs">
          <ul>
            <li v-for="t in tabs" :key="t" :class="{ active: t === activeTab }" @click="setTab(t)">{{ t }}</li>
          </ul>
        </div>

        <div class="list">
          <Msg
            v-for="m in messages"
            :key="m.id"
            :message="m"
            @open="openMessage"
          />
        </div>
      </main>
    </div>

</template>

<style lang="scss">
:root{
  --card:#fff;
  --muted:#9aa0a6;
  --accent:#ff6b00;
  --shadow: 0 4px 10px rgba(16,24,40,0.06);
}

.messages-page{ min-height:100vh; font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#111827;}

/* main */
.main{ flex:1;
  .tabs{ margin-bottom:18px;
    ul{ display:flex; gap:16px; list-style:none; padding:0; margin:0;
      li{ cursor:pointer; padding:8px 6px; color:var(--muted) }
      li.active{ color:var(--accent); border-bottom:2px solid var(--accent) }
    }
  }
  .list{ display:flex; flex-direction:column; gap:14px; max-width:760px; margin:0 auto; }
}

/* responsive */
@media (max-width:980px){ .content{ flex-direction:column; padding:18px } .sidebar{ width:100% } .main{ width:100% } }
</style>
