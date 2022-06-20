import { rearrangeFields } from "./rearrangeFieldsCallback";
export function prepForm() {
    window.nvtag_callbacks = window.nvtag_callbacks || {};
  
    nvtag_callbacks.alterFormDefinition = [rearrangeFields];
  }