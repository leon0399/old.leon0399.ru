<template>
  <base-case-item-card class="case--apteka">
    <div class="flex flex-col justify-end w-full h-full">
      <div class="case__illustration">
        <picture v-lazy-container="{ selector: 'img' }">
          <source
            :srcSet="`
              ${require('~/assets/img/cases/apteka149/hope.png?size=283&format=webp')} 1x,
              ${require('~/assets/img/cases/apteka149/hope.png?size=566&format=webp')} 2x,
              ${require('~/assets/img/cases/apteka149/hope.png?size=849&format=webp')} 3x
            `"
            type="image/webp"
          />
          <source
            :srcSet="`
              ${require('~/assets/img/cases/apteka149/hope.png?size=283')} 1x,
              ${require('~/assets/img/cases/apteka149/hope.png?size=566')} 2x,
              ${require('~/assets/img/cases/apteka149/hope.png?size=849')} 3x
            `"
            type="image/png"
          />
          <img
            :data-loading="
              require('~/assets/img/cases/apteka149/hope.png?lqip')
            "
            :data-src="
              require('~/assets/img/cases/apteka149/hope.png?size=283')
            "
            class="case__hope"
            alt="Hope"
            loading="lazy"
          />
        </picture>
        <picture v-lazy-container="{ selector: 'img' }">
          <source
            :srcSet="`
              ${require('~/assets/img/cases/apteka149/empathy.png?size=283&format=webp')} 1x,
              ${require('~/assets/img/cases/apteka149/empathy.png?size=566&format=webp')} 2x,
              ${require('~/assets/img/cases/apteka149/empathy.png?size=849&format=webp')} 3x
            `"
            type="image/webp"
          />
          <source
            :srcSet="`
              ${require('~/assets/img/cases/apteka149/empathy.png?size=283')} 1x,
              ${require('~/assets/img/cases/apteka149/empathy.png?size=566')} 2x,
              ${require('~/assets/img/cases/apteka149/empathy.png?size=849')} 3x
            `"
            type="image/png"
          />
          <img
            :data-loading="
              require('~/assets/img/cases/apteka149/empathy.png?lqip')
            "
            :data-src="
              require('~/assets/img/cases/apteka149/empathy.png?size=283')
            "
            class="case__empathy"
            alt="Empathy"
            loading="lazy"
          />
        </picture>
      </div>
      <div class="my-4">
        <a href="https://apteka149.ru/">
          <img
            src="~/assets/img/cases/apteka149/apteka149-logo.svg"
            alt="Project Logo"
          />
        </a>
      </div>
      <div>
        <p class="text-center">
          Pharmacy network website <strong>Design</strong> and
          <strong>Development</strong> at
          <a
            href="https://devolt.one/projects/apteka149/?ref=leon0399.ru"
            target="_blank"
          >
            <strong class="font-black font-montserrat">D.1</strong>
          </a>
        </p>
      </div>
    </div>
  </base-case-item-card>
</template>

<script>
import BaseCaseItemCard from './BaseCaseItemCard'
export default {
  name: 'CaseAptekaItemCard',
  components: { BaseCaseItemCard },
}
</script>

<style scoped lang="scss">
img[lazy='loading'] {
  filter: blur(15px);
}

.case--apteka {
  background-color: #c80000;
  background-position: top;
  background-size: cover;
  background-image: url('~/assets/img/cases/apteka149/background.png?size=283');
  background-image: image-set(
    url('~/assets/img/cases/apteka149/background.png?size=283') 1x,
    url('~/assets/img/cases/apteka149/background.png?size=566') 2x,
    url('~/assets/img/cases/apteka149/background.png?size=849') 3x
  );

  color: #ffffff;
  box-shadow: 0px 20px 120px rgba(#c80000, 0.1);

  .case__illustration {
  }

  .case__hope {
    position: absolute;

    width: 235.13px;
    height: 87.14px;

    left: calc(50% - 235.13px / 2 - 45.01px);
    top: 19.43px;

    transform: rotate(-35.29deg) translateZ(30px);
  }

  .case__empathy {
    position: absolute;

    width: 235.03px;
    height: 87.18px;

    left: calc(50% - 235.03px / 2 + 39.09px);
    top: calc(50% - 87.18px / 2 - 59.83px);

    transform: rotate(-14.72deg) translateZ(45px);
  }
}
</style>
