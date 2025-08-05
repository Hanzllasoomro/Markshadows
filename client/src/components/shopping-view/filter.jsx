import React, { Fragment } from "react";
import { filterOptions } from "../../config/index";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-xl shadow-md border">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="text-xl font-extrabold tracking-tight text-primary">
          Filters
        </h2>
      </div>

      <div className="p-5 space-y-4">
        <Accordion type="multiple" className="w-full space-y-2">
          {Object.keys(filterOptions).map((keyItem) => (
            <AccordionItem key={keyItem} value={keyItem}>
              <AccordionTrigger className="text-sm font-semibold uppercase text-muted-foreground">
                {keyItem}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {filterOptions[keyItem].map((option) => (
                    <label
                      key={option.label}
                      className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded-md transition-colors"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].includes(String(option.id))
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      <span className="text-sm text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProductFilter;
