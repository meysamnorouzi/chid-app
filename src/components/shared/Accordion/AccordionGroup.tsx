/**
 * AccordionGroup Component
 * 
 * Container for multiple accordion items with group management
 * Designed with modularity, scalability, and accessibility in mind
 */

import { useState, useCallback } from 'react';
import AccordionItem from './AccordionItem';
import type { AccordionGroupProps } from './types';

const AccordionGroup = ({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  expandedIds: controlledExpandedIds,
  onToggle,
  variant = 'default',
  size = 'md',
  spacing = 'sm',
  className = '',
  style,
}: AccordionGroupProps) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<Set<string>>(
    new Set(defaultExpandedIds)
  );
  const isControlled = controlledExpandedIds !== undefined;
  const expandedIdsSet = isControlled
    ? new Set(controlledExpandedIds)
    : internalExpandedIds;

  // Handle item toggle
  const handleItemToggle = useCallback(
    (expanded: boolean, id?: string) => {
      if (!id) return;

      const newExpandedIds = new Set(expandedIdsSet);

      if (expanded) {
        if (allowMultiple) {
          newExpandedIds.add(id);
        } else {
          // Close all others and open only this one
          newExpandedIds.clear();
          newExpandedIds.add(id);
        }
      } else {
        newExpandedIds.delete(id);
      }

      if (!isControlled) {
        setInternalExpandedIds(newExpandedIds);
      }

      onToggle?.(Array.from(newExpandedIds));
    },
    [allowMultiple, isControlled, expandedIdsSet, onToggle]
  );

  // Spacing configurations
  const spacingConfig = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={`accordion-group flex flex-col ${spacingConfig[spacing]} ${className}`}
      style={style}
      role="group"
      aria-label="Accordion group"
    >
      {items.map((item, index) => {
        const itemId = item.id || `accordion-item-${index}`;
        const isExpanded = expandedIdsSet.has(itemId);

        return (
          <AccordionItem
            key={itemId}
            {...item}
            id={itemId}
            expanded={isExpanded}
            onToggle={handleItemToggle}
            variant={variant}
            size={size}
            allowMultiple={allowMultiple}
          />
        );
      })}
    </div>
  );
};

export default AccordionGroup;

