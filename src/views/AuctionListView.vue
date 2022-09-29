<template>
  <h1>Auction</h1>
  <div class="events">
    <div class="search-box">
      <AuctionBaseInputVue
        v-model="keywordDes"
        type="text"
        label="Search for Description & Type of auction"
        @input="updateKeywordDescription"
      />
    </div>
    <AuctionCardVue
      v-for="auction in auctions"
      :key="auction.id"
      :auction="auction"
    ></AuctionCardVue>

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'auction', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'auction', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuctionBaseInputVue from '@/components/AuctionBaseInput.vue'
import AuctionService from '@/services/AuctionService'
import AuctionCardVue from '@/components/AuctionCard.vue'

export default {
  name: 'AuctionListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    AuctionCardVue,
    AuctionBaseInputVue
  },
  data() {
    return {
      auctions: null,
      totalEvents: 0,
      keywordDes: null,
      keywordType: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    AuctionService.getAuctions(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.auctions = response.data
          comp.totalEvents = response.headers['x-total-count']
          console.log(comp.auctions)
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keywordDes == null || this.keywordDes == '') {
      queryFunction = AuctionService.getAuctions(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = AuctionService.getAuctionByDescription(
        this.keywordDes,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.auctions = response.data // <---
        this.totalEvents = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 3)
      return this.page < totalPages
    }
  },
  methods: {
    updateKeywordDescription() {
      var queryFunction
      if (this.keyword == '') {
        queryFunction = AuctionService.getAuctions(3, 1)
      } else {
        queryFunction = AuctionService.getAuctionByDescription(
          this.keywordDes,
          3,
          1
        )
      }

      queryFunction
        .then((res) => {
          this.auctions = res.data
          console.log(this.auctions)
          this.totalEvents = res.headers['x-total-count']
          console.log(this.totalEvents)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  }
}
</script>
<style scoped>
.search-box {
  width: 300px;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
