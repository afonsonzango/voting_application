export async function generateIds(count: number): Promise<string[]> {
    const ids: string[] = [];
  
    async function generateIdAsync(): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const id = Math.floor(10000000 + Math.random() * 90000000).toString();
          resolve(id);
        }, 0);
      });
    }
  
    const idSet: Set<string> = new Set();
  
    while (idSet.size < count) {
      const id = await generateIdAsync();
      if (!idSet.has(id)) {
        idSet.add(id);
      }
    }
  
    ids.push(...idSet);
  
    return ids;
  }
  