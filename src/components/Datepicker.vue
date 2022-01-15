<template>
	<div>
		<v-text-field class="pointer" :value="value | DATE" :label="label" :rules="checks" @click="open" readonly></v-text-field>

		<v-dialog v-model="dialog" width="290px">
			<v-date-picker v-model="date" @change="save" :max="max" :min="min" />
		</v-dialog>
	</div>
</template>

<script>
import dayjs from "dayjs";
export default {
	props: ["value", "label", "error", "rules", "readonly", "max", "min"],
	data() {
		return {
			date: null,
			checks: [],
			dialog: false,
		};
	},
	watch: {
		dialog(open) {
			if (open || !this.rules) return;
			this.checks = this.rules;
		},
	},
	methods: {
		open() {
			if (this.readonly) return;
			if (this.value && dayjs(this.value).isValid()) {
				this.date = dayjs(this.value).format("YYYY-MM-DD");
			} else {
				this.date = dayjs().format("YYYY-MM-DD");
			}
			this.checks = [];
			this.dialog = true;
		},
		save() {
			this.$emit("input", this.date);
			this.dialog = false;
		},
	},
};
</script>
