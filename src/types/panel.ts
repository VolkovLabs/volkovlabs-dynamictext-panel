import { EditorOptions } from './editor';
import { Resource } from './resource';
import { DataFrame } from '@grafana/data';

/**
 * Editor Types
 */
export enum EditorType {
  DEFAULT = 'default',
  HELPERS = 'helpers',
  STYLES = 'styles',
  AFTER_RENDER = 'afterRender',
}

/**
 * Panel Options
 */
export interface PanelOptions {
  /**
   * Content
   *
   * @type {string}
   */
  content: string;

  /**
   * Default Content
   *
   * @type {string}
   */
  defaultContent: string;

  /**
   * Every Row
   *
   * @type {boolean}
   */
  everyRow: boolean;

  /**
   * Editors to Display
   *
   * @type {EditorType[]}
   */
  editors: EditorType[];

  /**
   * Editor
   *
   * @type {EditorOptions}
   */
  editor: EditorOptions;

  /**
   * Helpers
   *
   * @type {string}
   */
  helpers: string;

  /**
   * Styles
   *
   * @type {string}
   */
  styles: string;

  /** Status
   *
   * @type {string};
   */
  status: string;

  /**
   * External Styles
   *
   * @type {Resource[]}
   */
  externalStyles: Resource[];

  /**
   * External Scripts
   *
   * @type {Resource[]}
   */
  externalScripts: Resource[];

  /**
   * After Render Function
   *
   * @type {string}
   */
  afterRender: string;
}

/**
 * Row Item
 */
export interface RowItem {
  /**
   * HTML
   *
   * @type {string}
   */
  html: string;

  /**
   * Data
   *
   * @type {DataFrame | {}}
   */
  data: DataFrame | {};
}
