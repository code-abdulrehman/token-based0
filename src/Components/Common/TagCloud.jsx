import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TagCloud = ({
  label,
  placeholder = "Type tags separated by commas and press Enter",
  limit = 10,
  initialTags = [],
  onTagsChange,
  minTags = 0,
  errorMessage = "Minimum number of tags required not met.",
  tagType = 'text'
}) => {
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setTags(initialTags);
  }, []);

  useEffect(() => {
    if (tags.length < minTags) {
      setError(errorMessage);
    } else {
      setError('');
    }
  }, [tags, minTags, errorMessage]);

  const handleTagInputChange = (e) => setInputValue(e.target.value);

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTagsFromInput();
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      editPreviousTag();
    }
  };

  const addTagsFromInput = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      const newTags = trimmedValue.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      let updatedTags = editingTagIndex !== null 
        ? [...tags.slice(0, editingTagIndex), ...newTags, ...tags.slice(editingTagIndex + 1)]
        : [...tags, ...newTags].slice(0, limit);
  
      if (minTags === 1 && updatedTags.length === 0) return;
  
      setTags(updatedTags);
      onTagsChange(updatedTags); // Ensure this function is stable and does not cause side effects
      setInputValue('');
      setEditingTagIndex(null);
    }
  };
  

  const editPreviousTag = () => {
    if (tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      setInputValue(lastTag);
      setEditingTagIndex(tags.length - 1);
      setTags(tags.slice(0, -1));
      inputRef.current.focus();
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    if (minTags === 1 && newTags.length < minTags) return;
    setTags(newTags);
    onTagsChange(newTags);
  };

  const handleEditTag = (index) => {
    setInputValue(tags[index]);
    setEditingTagIndex(index);
    setTags(tags.filter((_, i) => i !== index));
    inputRef.current.focus();
  };

  const renderTag = (tag, index) => tagType === 'image' ? (
    <img key={index} src={tag} alt="Tag" className="w-16 h-16 object-cover rounded border border-gray-300" />
  ) : (
    <span key={index} className="text-sm max-w-xs break-words px-2 pl-6 py-1 border border-gray-300 rounded bg-white">
      {tag}
    </span>
  );

  return (
    <div className="overflow-y-auto">
      {label && <label className="block text-gray-700 mb-1 font-bold text-sm pl-1">{label}</label>}
      <div className="relative flex flex-wrap p-2 rounded-xl bg-gray-100 hover:bg-gray-200 min-h-24">
        <div className="flex flex-wrap gap-2 items-center py-1 w-full">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-2 cursor-pointer" onClick={() => handleEditTag(index)}>
              {renderTag(tag, index)}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(index);
                }}
                className="hover:text-white rounded-full flex justify-center items-center text-red-600 bg-slate-200 hover:font-bold absolute mb-2 ml-1 h-4 w-4 hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
          {tags.length < limit && (
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder={placeholder}
              className="flex-1 p-2 bg-transparent focus:border-none focus:outline-0 resize-y h-12"
              rows={1}
              maxLength={tagType === 'text' ? 20 : undefined}
            />
          )}
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

TagCloud.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  limit: PropTypes.number,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onTagsChange: PropTypes.func.isRequired,
  minTags: PropTypes.number,
  errorMessage: PropTypes.string,
  tagType: PropTypes.oneOf(['text', 'image'])
};

export default TagCloud;
