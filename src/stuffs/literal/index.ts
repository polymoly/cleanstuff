export function literal<S extends string>(
  text: string,
  variables: Record<string, string>
) {
  const regex = new RegExp(/({[^{]*?)\w(?=\})}/gim);

  return text.replace(regex, (match) => {
    return (variables[match.replace(/[{}]/g, "")] ?? match).toString();
  });
}
