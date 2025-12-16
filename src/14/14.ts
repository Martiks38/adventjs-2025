type Gift = string | number | boolean
type Workshop = Record<string, any>
type Path = string[]
type Nodo = Workshop

function findGiftPath(workshop: Workshop, gift: Gift): Path {
    const searchGift = (root: Nodo): Path => {
      const elements = Object.entries(root)
      
      for(const [node, item] of elements)
      {
        if(typeof item === "object")
        {
          const path = searchGift(item)
          
          if(path.length > 0)
            return [node, ...path]
        }
        else if(item === gift)
        {
          return [node]
        }
      }

      return []
    }
    
    return searchGift(workshop)
}