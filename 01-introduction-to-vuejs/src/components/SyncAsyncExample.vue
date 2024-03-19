<script>
export default {
  name: 'SyncAsyncExample',
  data () {
    return {}
  },
  methods: {
    printABC_sync(){
      console.log('A');
      console.log('B');
      console.log('C');
    },
    printABC_async(){
      console.log('A1');
      setTimeout(function(){
        console.log('B1')
      }, 1000);
      console.log('C1')
    }
  },
  mounted() {
    this.printABC_sync();
    this.printABC_async();
  }
}
</script>
