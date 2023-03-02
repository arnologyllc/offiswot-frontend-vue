<template>
  <div class="footer">
    <div class="footer__content">
      <div
        v-for="(item, index) in footerLinks"
        :key="`grid-item_${index}`"
        class="footer__grid-item"
      >
        <div class="footer__grid-item--heading">{{ item.name }}</div>
        <div :class="{ grid: item.type }">
          <div
            v-for="(link, i) in item.items"
            :key="`grid-item-link_${i}`"
            class="footer__grid-item--link"
          >
            <a v-if="!item.type" href="#">{{ link.title }}</a>
            <div v-else class="footer__grid-item--link__image">
              <img
                :src="require(`@/assets/images/icons/${link.title}.svg`)"
                :alt="item.title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__rights">
      <span>All rights reserved ©2022</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      footerLinks: [
        {
          name: 'Resources',
          items: [
            { title: 'Documentation' },
            { title: 'Terms & Conditions' },
            { title: 'Privacy Policy' },
            { title: 'FAQ' },
          ],
        },
        {
          name: 'Pricing',
          items: [
            { title: 'Free trial' },
            { title: 'Pricing' },
            { title: 'Premium Plan' },
          ],
        },
        {
          name: 'Company',
          items: [
            { title: 'About Us' },
            { title: 'Careers' },
            { title: 'Contact Us' },
          ],
        },
        {
          name: 'Social',
          type: 'icon',
          items: [
            { title: 'fb-icon' },
            { title: 'insta-icon' },
            { title: 'twitter-icon' },
            { title: 'li-icon' },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  padding: 45px 96px 22px 96px;
  margin-top: auto;
  background: linear-gradient(270deg, #4156f6 0%, #0cb1b9 113.37%);

  &__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  &__rights {
    font-size: 13px;
    color: $ov-gray-bg;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &__grid-item {
    &--heading {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-transform: uppercase;
      color: white;
      margin-bottom: 27px;
    }
    &--link {
      margin-bottom: 20px;

      & a {
        color: white;
        font-size: 14px;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      &__image {
        cursor: pointer;
        & img:hover {
          filter: invert(48%) sepia(9%) saturate(333%) hue-rotate(157deg)
            brightness(95%) contrast(88%);
        }
      }
    }
    .grid {
      display: flex;
      gap: 0 24px;
    }
  }
}

@media (max-width: 990px) {
  .footer {
    &__content {
      grid-template-columns: repeat(3, 1fr);
    }
    &__rights {
      justify-content: unset;
      margin-top: -40px;
    }
    &__grid-item:last-child {
      display: grid;
      justify-content: flex-end;
      grid-column: 1 / 4;
    }
  }
}
@media (max-width: 768px) {
  .footer {
    padding: 45px 30px 22px 96px;
    &__grid-item:last-child {
      padding-right: 40px;
    }
  }
}
@media (max-width: 425px) {
  .footer {
    padding-left: 71px;
    padding-right: 0px;
    padding-bottom: 40px;
    &__content {
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 0;
    }
    &__grid-item:last-child {
      display: grid;
      justify-content: unset;
      grid-column: unset;
    }
    &__rights {
      justify-content: center;
      margin-top: 0px;
      position: absolute;
      left: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 0fr);
      gap: 0 24px;
      margin-bottom: 24px;
    }
  }
}
@media (max-width: 375px) {
  .footer {
    padding: 45px 0 22px 40px;
  }
}
</style>
