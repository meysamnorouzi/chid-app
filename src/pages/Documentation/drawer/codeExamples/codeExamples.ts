/**
 * Code Examples for Drawer Documentation
 */

export const basicUsageCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer open={open} onClose={() => setOpen(false)}>
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

export const withTitleCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer 
    open={open} 
    onClose={() => setOpen(false)}
    title="Drawer Title"
  >
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

export const withFooterCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer 
    open={open} 
    onClose={() => setOpen(false)}
    title="Drawer Title"
    footer={
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)}>
          Confirm
        </Button>
      </div>
    }
  >
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

export const positionsCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer 
    open={open} 
    onClose={() => setOpen(false)}
    position="left" // or "right", "top", "bottom"
    title="Drawer Title"
  >
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

export const sizesCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer 
    open={open} 
    onClose={() => setOpen(false)}
    size="sm" // or "md", "lg", "xl", "full"
    title="Drawer Title"
  >
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

export const withoutBackdropCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer 
    open={open} 
    onClose={() => setOpen(false)}
    showBackdrop={false}
    title="Drawer Title"
  >
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

export const notClosableCode = `import { Drawer, Button } from '@/components/shared';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  <Drawer 
    open={open} 
    onClose={() => setOpen(false)}
    closable={false}
    backdropClosable={false}
    title="Drawer Title"
  >
    <p>Drawer content goes here</p>
  </Drawer>
</>`;

