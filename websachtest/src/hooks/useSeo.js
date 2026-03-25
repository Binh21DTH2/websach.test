import { useEffect } from 'react';

export function useSeo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      const name = 'description';
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}

