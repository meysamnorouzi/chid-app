/**
 * Code Examples for Snackbar Documentation
 */

export const basicUsageCode = `import { Snackbar } from '@/components/shared';
import { useState } from 'react';

const [show, setShow] = useState(true);

<Snackbar
  message="This is a snackbar message"
  visible={show}
  onClose={() => setShow(false)}
/>`;

export const withTypesCode = `import { Snackbar } from '@/components/shared';

<Snackbar type="info" message="Info message" visible={show} onClose={handleClose} />
<Snackbar type="success" message="Success message" visible={show} onClose={handleClose} />
<Snackbar type="warning" message="Warning message" visible={show} onClose={handleClose} />
<Snackbar type="error" message="Error message" visible={show} onClose={handleClose} />`;

export const withActionCode = `import { Snackbar, Button } from '@/components/shared';

<Snackbar
  message="Item deleted"
  visible={show}
  onClose={handleClose}
  action={
    <Button size="sm" variant="text" onClick={handleUndo}>
      Undo
    </Button>
  }
/>`;

export const variantsCode = `import { Snackbar } from '@/components/shared';

<Snackbar variant="default" message="Message" visible={show} onClose={handleClose} />
<Snackbar variant="filled" message="Message" visible={show} onClose={handleClose} />
<Snackbar variant="outlined" message="Message" visible={show} onClose={handleClose} />`;

export const positionsCode = `import { Snackbar } from '@/components/shared';

<Snackbar position="top-left" message="Message" visible={show} onClose={handleClose} />
<Snackbar position="top-center" message="Message" visible={show} onClose={handleClose} />
<Snackbar position="top-right" message="Message" visible={show} onClose={handleClose} />
<Snackbar position="bottom-left" message="Message" visible={show} onClose={handleClose} />
<Snackbar position="bottom-center" message="Message" visible={show} onClose={handleClose} />
<Snackbar position="bottom-right" message="Message" visible={show} onClose={handleClose} />`;

export const sizesCode = `import { Snackbar } from '@/components/shared';

<Snackbar size="sm" message="Message" visible={show} onClose={handleClose} />
<Snackbar size="md" message="Message" visible={show} onClose={handleClose} />
<Snackbar size="lg" message="Message" visible={show} onClose={handleClose} />`;

export const autoDismissCode = `import { Snackbar } from '@/components/shared';

<Snackbar
  message="This will auto-dismiss in 5 seconds"
  duration={5000}
  visible={show}
  onClose={handleClose}
/>`;

export const withoutCloseCode = `import { Snackbar } from '@/components/shared';

<Snackbar
  message="This snackbar cannot be closed manually"
  closable={false}
  duration={3000}
  visible={show}
  onClose={handleClose}
/>`;

