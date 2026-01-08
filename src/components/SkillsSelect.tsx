import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MARKETING_SKILLS } from '@/lib/skillsList';

interface SkillsSelectProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsSelect = ({ selectedSkills, onSkillsChange }: SkillsSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSkills = MARKETING_SKILLS.filter(
    skill =>
      skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  const handleSelect = (skill: string) => {
    onSkillsChange([...selectedSkills, skill]);
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleRemove = (skill: string) => {
    onSkillsChange(selectedSkills.filter(s => s !== skill));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedSkills.map(skill => (
            <Badge key={skill} variant="secondary" className="pr-1">
              {skill}
              <button
                type="button"
                onClick={() => handleRemove(skill)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input & Dropdown Trigger */}
      <div
        className="flex items-center border border-input rounded-md bg-background cursor-text"
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <Search className="h-4 w-4 ml-3 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search skills (e.g., Premiere Pro, After Effects, UI/UX...)"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <ChevronDown className="h-4 w-4 mr-3 text-muted-foreground" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredSkills.length > 0 ? (
            filteredSkills.map(skill => (
              <div
                key={skill}
                className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(skill)}
              >
                {skill}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No skills found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsSelect;
