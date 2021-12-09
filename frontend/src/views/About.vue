<template>
  <div class="about">
    <p
      ondblclick="this.contentEditable=true;this.className='inEdit';"
      onblur="this.contentEditable=false;this.className='';"
      contenteditable="false"
      class=""
    >
      This paragraph uses some simple script to be editable. Double-click the
      text to begin editing.
    </p>
  </div>
</template>
