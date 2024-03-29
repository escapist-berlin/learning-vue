<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4"
        v-if="show_alert"
        :class="alert_variant"
        >
        {{ alert_message }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
        >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name"/>
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre"/>
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          {{ $t("song.submit_btn") }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          {{ $t("song.go_back") }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { ErrorMessage } from 'vee-validate';
import { db, storage } from "@/includes/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export default {
  name: 'CompositionItem',
  components: { ErrorMessage },
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! Updating song info.',
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! Updating song info.';

      const songRef = doc(db, `songs/${this.song.docID}`);

      try {
        await updateDoc(songRef, values);
      } catch(error) {
        console.log("error while updating", error)
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Something went wrong! Try again later';
        return;
      }

      this.updateSong(this.index, values)
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success!';
    },
    async deleteSong() {
      const songRef = ref(storage, `songs/${this.song.original_name}`);

      deleteObject(songRef).then(() => {
        console.log("File deleted successfully");
      }).catch((error) => {
        console.log("error while deleting the file", error);
      })

      await deleteDoc(doc(db, "songs", this.song.docID));

      this.removeSong(this.index);
    },
  },
}
</script>