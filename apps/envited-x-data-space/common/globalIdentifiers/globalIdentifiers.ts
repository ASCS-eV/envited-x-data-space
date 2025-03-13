import { prop, split, reduce } from 'ramda';
import { GlobalIdentifier } from "../types";
import { SUPPORTED_PATTERNS } from './constants';
import { IdentifierMethod } from '../types/types';

export const stringifyGlobalIdentifier = (identifier: GlobalIdentifier): string => {
  const pattern = SUPPORTED_PATTERNS[identifier.method];
  return reduce(
    (acc, key) => acc + (acc ? ':' : '') + (prop(key as keyof GlobalIdentifier, identifier) || ''),
    '',
    pattern
  );
};

export const parseGlobalIdentifier = (identifier: string): GlobalIdentifier => {
  if (!identifier) return {} as GlobalIdentifier;
  
  const emptyToNull = (value: string | undefined): string | null => 
    value && value.trim() !== '' ? value : null;
  
  const parts = split(':', identifier);
  
  // Determine the method (first two parts for our supported methods)
  const method = parts[0] + ':' + parts[1] as IdentifierMethod;
  
  // Check if we have a supported pattern for this method
  if (SUPPORTED_PATTERNS[method]) {
    // Initialize with required properties
    const result: Partial<GlobalIdentifier> = {
      method
    };
    
    // Get the pattern for this method
    const pattern = SUPPORTED_PATTERNS[method];
    
    // Special case for Tezos DIDs: if method is did:pkh and namespace is tz
    if (method === 'did:pkh' && parts[2] === 'tz') {
      result.namespace = 'tezos';
      result.chainId = 'NetXnHfVqm9iesp';
      result.nss = parts[3] || undefined;
      return result as GlobalIdentifier;
    }
    
    // Map each pattern key (except the first one which is 'method') to its corresponding part
    pattern.slice(1).forEach((key, index) => {
      // index + 2 because:
      // - We skip the first pattern key ('method')
      // - Parts start at index 2 (after method parts)
      const value = emptyToNull(parts[index + 2]);
      
      // TypeScript doesn't allow direct indexing with a variable on an interface type
      // So we need to use a type assertion here
      (result as any)[key] = value;
    });
    
    return result as GlobalIdentifier;
  }
  
  return {} as GlobalIdentifier;
};