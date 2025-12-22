import pc from 'picocolors';

export function showTitle() {
  const TITLE_TEXT = 'Generador de archivos de retos';
  const PADDING_SIZE = 4;
  const TITLE_PADDING = ' '.repeat(PADDING_SIZE);
  const TITLE = `${TITLE_PADDING}${TITLE_TEXT}${TITLE_PADDING}`;
  const border = '='.repeat(TITLE.length);

  console.log('');
  console.log(pc.cyan(border));
  console.log(pc.bold(pc.cyan(TITLE)));
  console.log(pc.cyan(border));
  console.log('');
}
