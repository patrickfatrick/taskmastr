<template>
	<table id="lists-list" v-show="lists">
		<thead>
			<tr>
				<th>name</th>
				<th>utils</th>
			</tr>
		</thead>
		<tbody v-el:dragula>
			<tr v-for="list in lists" v-bind:class="{'deleting': list.delete, 'current': current.list === list.list}" name="list{{$index + 1}}" transition="item">
				<th></th>
				<td class="todo-cell" v-on:click="setCurrentList($index)">
					<input class="rename" type="text" v-model="list.list" v-show="renameToggled === $index" v-on:keyup.enter="renameToggle(null)" v-on:blur="renameToggle(null)"></input>
					<span class="name" v-show="renameToggled !== $index" v-on:dblclick="renameToggle($index)">{{list.list}}</span>
				</td>
				<td class="utils">
					<i class="fa fa-arrows-v sort"></i>
					<i class="fa fa-pencil rename-button" v-on:click="renameToggle($index)"></i>
					<i class="fa" v-bind:class="{'fa-trash-o': !list.delete, 'fa-undo': list.delete}" v-on:click="deleteList($index)"></i>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>

import _ from 'lodash';
import dragula from 'dragula';
import Mousetrap from 'mousetrap';
import store from '../../store/store';

export default {
	data () {
		return {
			renameToggled: null,
			drake: dragula({
				revertOnSpill: true,
				moves: (el, source, handle) => {
					if (handle.classList.contains('sort')) return true;
					return false;
				}
			}),
			dragStart: null
		};
	},
	computed: {
		current () {
			return store.state.user.current;
		},
		lists () {
			return store.state.user.tasks;
		}
	},
	methods: {
		deleteList: store.actions.deleteList,
		setCurrentList: store.actions.setCurrentList,
		sortLists: store.actions.sortLists,
		renameToggle (index) {
			if (this.renameToggled === index) return this.renameToggled = null;
			return this.renameToggled = index;
		},
		_drag (drake) {
			drake.on('drag', el => {
				this.dragStart = this._index(el);
			});
		},
		_drop (drake) {
			drake.on('drop', (el) => {
				let oldIndex = this.dragStart;
				let newIndex = this._index(el);
				this.sortLists(oldIndex, newIndex);
			});
		},
		_index (el) {
			var index = 0;
			if (!el || !el.parentNode) return -1;
			while (el && (el = el.previousElementSibling)) index++;
			return index;
		}
	},
	ready () {
		this.drake.containers = [this.$els.dragula];
		this._drag(this.drake);
		this._drop(this.drake);

		// Keyboard bindings
		Mousetrap.bind('alt+up', () => {
			return this.setCurrentList(_.findIndex(this.lists, 'current', true) - 1);
		});
		Mousetrap.bind('alt+down', () => {
			return this.setCurrentList(_.findIndex(this.lists, 'current', true) + 1);
		});
		Mousetrap.bind('alt+backspace', () => {
			return this.deleteList(_.findIndex(this.lists, 'current', true));
		});
		Mousetrap.bind('alt+r', () => {
			return this.renameToggle(_.findIndex(this.lists, 'current', true));
		});
		Mousetrap.bind('alt+s', () => {
			const currentIndex = _.findIndex(this.lists, 'current', true);

			if (currentIndex === this.lists.length) return;

			return this.sortLists(currentIndex, currentIndex + 1);
		});
		Mousetrap.bind('alt+w', () => {
			const currentIndex = _.findIndex(this.lists, 'current', true);

			if (currentIndex === 0) return;

			return this.sortLists(currentIndex, currentIndex - 1);
		});
	}
};

</script>