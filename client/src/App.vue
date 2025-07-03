<template>
	<div class="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
		<h1 class="text-2xl font-bold mb-6">🚴‍♂️ Bike Image Analyzer</h1>

		<form @submit.prevent="submitImage" class="w-full max-w-md">
			<label
				for="file"
				class="block w-full h-48 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-500"
			>
				<span v-if="!preview">Click or drag an image here</span>
				<img v-if="preview" :src="preview" class="max-h-40 object-contain" />
				<input
					id="file"
					type="file"
					class="hidden"
					accept="image/*"
					@change="onFileChange"
				/>
			</label>

			<button
				type="submit"
				:disabled="!image"
				class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
			>
				Upload & Analyze
			</button>
		</form>

		<div v-if="result" class="mt-6 bg-white shadow p-4 rounded w-full max-w-md">
			<h2 class="font-semibold mb-2">Prediction:</h2>
			<ul class="list-disc pl-5">
				<li v-for="(item, index) in result" :key="index">
					{{ item.label }} ({{ (item.score * 100).toFixed(1) }}%)
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const image = ref<File | null>(null);
const preview = ref<string | null>(null);
const result = ref<{ label: string; score: number }[] | null>(null);

const onFileChange = (e: Event) => {
	const files = (e.target as HTMLInputElement).files;
	if (files && files[0]) {
		image.value = files[0];
		preview.value = URL.createObjectURL(files[0]);
		result.value = null;
	}
};

const submitImage = async () => {
	if (!image.value) return;

	const formData = new FormData();
	formData.append("image", image.value);

	try {
		const res = await fetch("http://localhost:4000/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!res.ok) throw new Error("Upload failed");

		const data = await res.json();
		result.value = data;
	} catch (err) {
		console.error(err);
		alert("Error uploading image");
	}
};
</script>
