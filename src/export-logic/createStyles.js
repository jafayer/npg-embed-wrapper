export async function createStyles(args) {
    
    const values = await args;

    const existingStyles = document.querySelector('.custom-at-styles');

    const styleText = `
    .at-title {
        display: ${values.hide_header ? "none" : "block"} !important;
    }

    .at-inner {
        background-color: ${ values.form_background_transparent ? "transparent" : values.form_background_color } !important;
    }

    .at-fieldset.Container .at-fields, .at-form-submit, .at-inner form {
        display: flex;
        flex-direction: ${ values.orientation === "vertical" ? "column" : "row" };
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        margin: 0 auto !important;
        float: none;
      }

      .at-fieldset.Container input {
        border-radius: ${ values.border_radius }px !important;
        border-color: ${ values.border_color } !important;
        background-color: ${ values.input_background_color } !important;
        color: ${ values.input_text_color } !important;
        padding-top: ${ values.input_padding }px !important;
        padding-bottom: ${ values.input_padding }px !important;
      }
      
      .at-form-submit input[type="submit"] {
        margin: 0 !important;
        width: ${ values.submit_button_full_width ? "100%" : "auto" } !important;
        background-color: ${ values.submit_background_color } !important;
        color: ${ values.submit_text_color } !important;
      }
      
      .UpdateMyProfile, .TrackingPixel, .PersonalUrl, .YesSignMeUpForUpdatesForBinder {
        display: none !important;
      }

      @media screen and (max-width: 675px) {
        .at-fieldset.Container .at-fields, .at-form-submit, .at-inner form {
          flex-direction: column;
        }
      }

    `;

    if(!existingStyles) {
        const styles = document.createElement('style');
        styles.classList.add('custom-at-styles');
        styles.innerHTML = styleText;
        document.querySelector('.ngp-area').append(styles);
    } else {
        existingStyles.innerHTML = styleText;
    }
};