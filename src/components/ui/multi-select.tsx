import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  maxItems?: number
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  maxItems
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      if (maxItems && selected.length >= maxItems) {
        return
      }
      onChange([...selected, option])
    }
  }

  const handleRemove = (option: string) => {
    onChange(selected.filter((item) => item !== option))
  }

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="text-sm"
          >
            {item}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRemove(item)
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleRemove(item)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
      <Command className="overflow-visible bg-transparent">
        <CommandInput
          placeholder={placeholder}
          value={search}
          onValueChange={setSearch}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
        />
        {open && filteredOptions.length > 0 && (
          <div className="relative mt-2">
            <div className="absolute top-0 z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="max-h-60 overflow-auto">
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option)
                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => handleSelect(option)}
                      className={cn(
                        "cursor-pointer",
                        isSelected && "bg-accent"
                      )}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <span className="h-4 w-4">✓</span>
                      </div>
                      {option}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          </div>
        )}
        {open && filteredOptions.length === 0 && search && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
      </Command>
    </div>
  )
}