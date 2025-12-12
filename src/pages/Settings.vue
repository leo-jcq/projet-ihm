<script setup lang="ts">
 
</script>

<template>
    <main class="main">
        <section class="panel">
          <h2>Notifications</h2>

          <div class="field">
            <label class="field-title">Lorsque je reçois un nouveau message</label>
            <div class="options">
              <label class="opt"><input type="radio" name="msg" /> Toujours</label>
              <label class="opt"><input type="radio" name="msg" /> Que des profils que je suis</label>
              <label class="opt"><input type="radio" name="msg" /> Jamais</label>
            </div>
          </div>

          <div class="field">
            <label class="field-title">Lorsque je reçois un j'aime sur une publication</label>
            <div class="options">
              <label class="opt"><input type="radio" name="like" /> Toujours</label>
              <label class="opt"><input type="radio" name="like" /> Que des profils que je suis</label>
              <label class="opt"><input type="radio" name="like" /> Jamais</label>
            </div>
          </div>

          <div class="field">
            <label class="field-title">Lorsque je reçois un commentaire sur une publication</label>
            <div class="options">
              <label class="opt"><input type="radio" name="comment" /> Toujours</label>
              <label class="opt"><input type="radio" name="comment" /> Que des profils que je suis</label>
              <label class="opt"><input type="radio" name="comment" /> Jamais</label>
            </div>
          </div>

          <div class="field">
            <label class="field-title">Lorsque j'ai un nouvel abonné</label>
            <div class="options single">
              <label class="opt"><input type="radio" name="follow" /> Toujours</label>
              <label class="opt"><input type="radio" name="follow" /> Jamais</label>
            </div>
          </div>
        </section>

        <section class="panel">
          <h2>Langue et système de cotation</h2>

          <div class="field">
            <label class="field-title">Langue de l'application</label>
            <div class="language-row">
              <label class="opt"><input type="radio" name="lang" /> Français</label>
              <input class="lang-search" placeholder="Rechercher..." />
            </div>
          </div>

          <div class="field">
            <label class="field-title">Système de cotation</label>
            <div class="options rating">
              <label class="opt"><input type="radio" name="rating" /> FR (7A)</label>
              <label class="opt"><input type="radio" name="rating" /> US (V6)</label>
              <label class="opt"><input type="radio" name="rating" /> JAP (1 kyu)</label>
              <label class="opt"><input type="radio" name="rating" /> UK (B7)</label>
            </div>
          </div>
        </section>
      </main>
</template>

<style lang="scss">

:root{
  --bg:#f6f6f7;
  --card:#fff;
  --muted:#9aa0a6;
  --accent:#ff6b00;
  --shadow: 0 4px 10px rgba(16,24,40,0.06);
}


.content{
  display:flex;
  gap:28px;
  padding:28px;
  max-width:1200px;
  margin:0 auto;
}


/* main content */
.main{ flex:1;
  .panel{
    background: transparent;
    margin-bottom: 22px;
    h2{ font-size:16px; margin-bottom:12px }
    .field{
      background:var(--card);
      padding:20px;
      border-radius:10px;
      box-shadow:var(--shadow);
      margin-bottom:20px;
      .field-title{ display:block; font-weight:600; margin-bottom:8px }

      
      .options{
        display:flex;
        gap:28px;
        align-items:center;
        justify-content:center;    
        flex-wrap:wrap;            
        padding:8px 0;

        .opt{
          display:flex;
          gap:10px;
          align-items:center;
          justify-content:center;
          color:#333;
          min-width:160px;       
          padding:10px 14px;
          border-radius:10px;
          
          input{ accent-color: var(--accent) }
        }

        &.single{ gap:36px }
      }

      .language-row{
        display:flex;
        gap:12px;
        align-items:center;
        justify-content:space-between; /* place la barre de recherche à droite */
        width:100%;

        .opt{
          margin-right:8px;
          min-width:140px;
          justify-content:center;
        }

        .lang-search{
          flex:1;
          height:36px;
          border-radius:8px;
          border:1px solid #e6e6e8;
          padding:0 12px;
          background:#fafafa;
        }
      }
      .rating{ flex-wrap:wrap }
    }
  }
}

/* responsive */
@media (max-width:980px){
  .content{ flex-direction:column; padding:18px }
  .sidebar{ width:100% }
  .main{ width:100% }
}
</style>