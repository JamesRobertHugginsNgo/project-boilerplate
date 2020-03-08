import Vue from '../vendors/vue/vue.esm.browser.min.js';
import foo from './foo.mjs';

new Vue({
	el: '#app',
	components: {
		'my-foo': foo
	},
  data: {
		title: 'Project Boilerplate',
		fooBody: 'Nam faucibus elit non efficitur condimentum. Praesent dignissim ultricies bibendum. Cras eros quam, vestibulum ac metus quis, consectetur aliquam felis. Aenean a enim quis diam cursus accumsan auctor sit amet ipsum. Nunc dictum nunc in sapien dapibus cursus. Integer in congue sem. Pellentesque eu facilisis odio. Cras magna ante, pretium dapibus scelerisque sed, rhoncus eu nibh. Integer non urna vitae dui scelerisque placerat nec vitae quam. Curabitur tristique, diam et scelerisque luctus, tortor augue facilisis enim, eu accumsan turpis lectus at ex. Duis ut sollicitudin lorem, id eleifend lectus. Ut elementum tincidunt libero, sit amet mollis ante viverra id. Vestibulum iaculis enim ante, lacinia ultricies purus fringilla id. Praesent metus nisi, placerat accumsan ullamcorper vel, congue ut neque. Praesent dictum ante eget eros sodales, sed mattis nisi rhoncus. Ut a velit et neque efficitur porttitor ac et nisi.'
  }
});
