<template>
  <base-case-item-card class="case--apteka">
    <div class="flex flex-col justify-end w-full h-full">
      <div class="case__illustration">
        <img
          src="@/assets/img/cases/apteka149/hope.png"
          srcset="
            @/assets/img/cases/apteka149/hope.png    1x,
            @/assets/img/cases/apteka149/hope@2x.png 2x,
            @/assets/img/cases/apteka149/hope@3x.png 3x
          "
          class="case__hope"
          alt="Hope"
        />
        <img
          src="@/assets/img/cases/apteka149/empathy.png"
          srcset="
            @/assets/img/cases/apteka149/empathy.png    1x,
            @/assets/img/cases/apteka149/empathy@2x.png 2x,
            @/assets/img/cases/apteka149/empathy@3x.png 3x
          "
          class="case__empathy"
          alt="Empathy"
        />
      </div>
      <div class="my-4">
        <a href="https://apteka149.ru/">
          <img
            src="@/assets/img/cases/apteka149/apteka149-logo.svg"
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
.case--apteka {
  background-color: #c80000;
  color: #ffffff;
  box-shadow: 0px 20px 120px rgba(#c80000, 0.1);

  .case__illustration {
  }

  .case__hope {
    position: absolute;
    will-change: transform;
    transition: transform 0.3s ease;

    width: 235.13px;
    height: 87.14px;

    left: calc(50% - 235.13px / 2 - 45.01px);
    top: 19.43px;

    transform: rotate(-35.29deg);
  }

  .case__empathy {
    position: absolute;
    will-change: transform;
    transition: transform 0.3s ease;

    width: 235.03px;
    height: 87.18px;

    left: calc(50% - 235.03px / 2 + 39.09px);
    top: calc(50% - 87.18px / 2 - 59.83px);

    transform: rotate(-14.72deg);
  }

  &:hover {
    .case__hope {
      transform: rotate(-35.29deg) scale(1.05);
      transition-duration: 0.8s;
    }
    .case__empathy {
      transform: rotate(-14.72deg) scale(1.05);
      transition-duration: 0.8s;
    }
  }
}
</style>
