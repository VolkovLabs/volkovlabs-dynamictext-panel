import { Field, FieldConfigProperty, FieldType, PanelPlugin } from '@grafana/data';
import { config } from '@grafana/runtime';
import { HelpersEditor, ResourcesEditor, StylesEditor, TextEditor, TextPanel } from './components';
import {
  CodeLanguageOptions,
  DefaultOptions,
  EditorsOptions,
  EveryRowOptions,
  FormatOptions,
  WrapOptions,
} from './constants';
import { EditorType, PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(TextPanel)
  .setNoPadding()
  .useFieldConfig({
    disableStandardOptions: [
      FieldConfigProperty.Unit,
      FieldConfigProperty.Color,
      FieldConfigProperty.Min,
      FieldConfigProperty.Max,
      FieldConfigProperty.Decimals,
      FieldConfigProperty.DisplayName,
      FieldConfigProperty.NoValue,
      FieldConfigProperty.Links,
      FieldConfigProperty.Mappings,
    ],
  })
  .setPanelOptions((builder) => {
    builder
      .addRadio({
        path: 'everyRow',
        name: 'Render template',
        settings: {
          options: EveryRowOptions,
        },
        defaultValue: DefaultOptions.everyRow,
      })
      .addMultiSelect({
        path: 'editors',
        name: 'Select Editors to display. Editors with updated values always displayed.',
        settings: {
          options: EditorsOptions as any,
        },
        defaultValue: DefaultOptions.editors,
      })
      .addFieldNamePicker({
        path: 'status',
        name: 'Field with status value. To be used to get statusColor based on thresholds.',
        settings: {
          filter: (f: Field) => f.type === FieldType.number,
          noFieldsMessage: 'No number fields found',
        },
      });

    /**
     * External Resources
     */
    builder
      .addCustomEditor({
        id: 'externalStyles',
        path: 'externalStyles',
        name: 'Styles',
        defaultValue: DefaultOptions.externalStyles,
        editor: ResourcesEditor,
        category: ['External Resources'],
        showIf: () => config.disableSanitizeHtml,
      })
      .addCustomEditor({
        id: 'externalScripts',
        path: 'externalScripts',
        name: 'Scripts',
        defaultValue: DefaultOptions.externalScripts,
        editor: ResourcesEditor,
        category: ['External Resources'],
        showIf: () => config.disableSanitizeHtml,
      });

    /**
     * Editor
     */
    builder
      .addRadio({
        path: 'editor.language',
        name: 'Primary Content Language',
        description: 'Used for formatting and suggestions.',
        settings: {
          options: CodeLanguageOptions,
        },
        defaultValue: DefaultOptions.editor.language,
        category: ['Editor'],
      })
      .addRadio({
        path: 'editor.format',
        name: 'Formatting',
        settings: {
          options: FormatOptions,
        },
        defaultValue: DefaultOptions.editor.format,
        category: ['Editor'],
      })
      .addSliderInput({
        path: 'editor.height',
        name: 'Height, px',
        defaultValue: DefaultOptions.editor.height,
        settings: {
          min: 100,
          max: 2000,
        },
        category: ['Editor'],
      });

    /**
     * Content
     */
    builder
      .addRadio({
        path: 'wrap',
        name: 'Wrap automatically in paragraphs',
        description: 'If disabled, result will NOT be wrapped into <p> tags.',
        defaultValue: DefaultOptions.wrap,
        settings: {
          options: WrapOptions,
        },
        category: ['Content'],
      })
      .addCustomEditor({
        id: 'content',
        path: 'content',
        name: 'Content',
        defaultValue: DefaultOptions.content,
        editor: TextEditor,
        category: ['Content'],
      })
      .addCustomEditor({
        id: 'defaultContent',
        path: 'defaultContent',
        name: 'Default Content',
        description: 'Displayed when query result is empty.',
        defaultValue: DefaultOptions.defaultContent,
        editor: TextEditor,
        category: ['Content'],
        showIf: (config) =>
          config.editors.includes(EditorType.DEFAULT) || config.defaultContent !== DefaultOptions.defaultContent,
      });

    /**
     * JavaScript
     */
    builder
      .addCustomEditor({
        id: 'helpers',
        path: 'helpers',
        name: 'Before Content Rendering',
        description: 'Allows to execute code before content rendering. E.g. add Handlebars Helpers.',
        defaultValue: DefaultOptions.helpers,
        editor: HelpersEditor,
        category: ['JavaScript'],
        showIf: (config) => config.editors.includes(EditorType.HELPERS) || config.helpers !== DefaultOptions.helpers,
      })
      .addCustomEditor({
        id: 'afterRender',
        path: 'afterRender',
        name: 'After Content Ready',
        description:
          'Allows to execute code after content is ready. E.g. use element for drawing chart or event listeners.',
        defaultValue: DefaultOptions.afterRender,
        editor: HelpersEditor,
        category: ['JavaScript'],
        showIf: (config) =>
          config.editors.includes(EditorType.AFTER_RENDER) || config.afterRender !== DefaultOptions.afterRender,
      });

    /**
     * Styles
     */
    builder.addCustomEditor({
      id: 'styles',
      path: 'styles',
      name: 'CSS Styles',
      description: 'Allows to add styles. Use & {} for parent style.',
      defaultValue: DefaultOptions.styles,
      editor: StylesEditor,
      category: ['CSS Styles'],
      showIf: (config) => config.editors.includes(EditorType.STYLES) || config.styles !== DefaultOptions.styles,
    });

    return builder;
  });
