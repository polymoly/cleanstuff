export function literal(text: string, variables: Record<string, string>) {
  const regex = new RegExp(/({[^{]*?)\w(?=\})}/gim);

  return text.replace(regex, (match) =>
    (variables[match.replace(/[{}]/g, "")] ?? match).toString()
  );
}
