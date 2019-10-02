<template>
  <div class=breadcrumb-links >
    <router-link class="breadcrumb-link" v-for="crumb in bread" :key="crumb.path"
                  :to="crumb.path">{{crumb.title}} > </router-link>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    computed: {
      bread() {
        const parts = this.$page.path.split("/");
        if (!parts[parts.length - 1].length) { parts.pop(); }
        let link = "";
        const crumbs = [];
        for (let i = 0; i < parts.length; i++) {
          link += parts[i];
          const page = this.$site.pages.find((el) => el.path === link || el.path === link + "/");
          link += "/";
          if (page != null) {
            crumbs.push({path: page.path, title: page.frontmatter.breadcrumb || page.title});
          }
        }
        return crumbs;
      },
    },
  };
</script>

<style lang="stylus" scoped>
a.breadcrumb-link
  font-size 0.8em
  color $textColor
  padding 0.35rem 0.35rem 0.35rem 1.5rem
  display inline-block
  &:hover
    color $accentColor
.breadcrumb-links
  background-color papayawhip
  border-bottom 1px solid #eaecef
</style>
