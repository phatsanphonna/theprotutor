<script>
  import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLine,
    IconPhone,
  } from "@tabler/icons-svelte";
</script>

<div class="variant-filled-secondary h-auto w-full">
  <div
    class="container mx-auto flex flex-col md:flex-row justify-start md:justify-between px-4 py-8 gap-8 md:gap-0"
  >
    <div class="grid grid-cols-1 gap-4">
      <div>
        <h4 class="font-bold">สถาบันกวดวิชาเดอะโปร</h4>
        <p>559/3</p>
        <p>ซอยพหลโยธิน 58 แยก 31</p>
        <p>แขวงสายไหม เขตสายไหม</p>
        <p>กรุงเทพมหานคร</p>
        <p>10220</p>
      </div>

      <p class="inline-flex items-center gap-2">
        <IconPhone />
        <span>096 223 9941</span>
      </p>
    </div>

    <div
      class="flex justify-start md:justify-end items-start md:items-end flex-col gap-4"
    >
      <img
        class="select-none"
        src="/logo.png"
        alt="THE PRO TUTOR"
        width={80}
        height={80}
        loading="eager"
      />

      <div class="flex gap-2">
        <a
          href="https://www.facebook.com/The-Pro-Tutor-104995751003126/"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandFacebook />
        </a>
        <a href="https://lin.ee/BdFh3Km" target="_blank" rel="noreferrer">
          <IconBrandLine />
        </a>
        <a
          href="https://www.instagram.com/thepro_tutor/"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandInstagram />
        </a>
      </div>

      <div class="text-xs font-light text-left md:text-right flex flex-col gap-1">
        <ul class="flex md:justify-end items-center gap-4 text-base">
          <li>
            <a href="/privacy-policy" class="underline text-left">นโยบายความเป็นส่วนตัว</a
            >
          </li>
        </ul>

        <p>Copyright © 2023 THE PRO TUTOR, All rights reserved.</p>
      </div>
    </div>
  </div>
</div>
