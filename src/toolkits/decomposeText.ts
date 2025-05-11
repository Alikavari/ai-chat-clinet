interface FunctionCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string; // still JSON string here
  };
}

interface AdditionalKwargs {
  refusal: string | null;
  tool_calls?: FunctionCall[];
}

export interface FinalOutput {
  resultText: string;
  functionName: string | null;
  functionArgs: Record<string, any> | null;
}

function decomposeContent(input: string): {
  content: string;
  additionalKwargs: AdditionalKwargs;
} {
  const marker = '##ADDITIONAL_KWARGS==';
  const i = input.indexOf(marker);
  if (i < 0) throw new Error('Marker not found in input');

  const content = input.slice(0, i).trim();
  let dictStr = input.slice(i + marker.length).trim();

  // Fix the Python-style single quotes and None/null
  dictStr = dictStr
    .replace(/'/g, '"') // replace all single quotes with double quotes
    .replace(/\bNone\b/g, 'null'); // replace None with null

  // Escape inner double quotes in the 'arguments' field
  dictStr = dictStr.replace(/"arguments":\s*"({.*?})"/g, (match, p1) => {
    return `"arguments": "${p1.replace(/"/g, '\\"')}"`; // Escape inner double quotes
  });

  const parsed = JSON.parse(dictStr);

  const additionalKwargs: AdditionalKwargs = {
    refusal: parsed.refusal,
    tool_calls: parsed.tool_calls
  };

  return {content, additionalKwargs};
}

function generateMarkdownTableFromArguments(argumentsJson: string): string {
  const argsObj = JSON.parse(argumentsJson) as Record<string, any>;
  let table = '| Parameter | Value |\n| --- | ----- |\n';
  for (const [k, v] of Object.entries(argsObj)) {
    table += `| ${k} | ${v} |\n`;
  }
  return table;
}

export function parseResponse(input: string): FinalOutput {
  const {content, additionalKwargs} = decomposeContent(input);

  if (additionalKwargs.tool_calls?.length) {
    const fn = additionalKwargs.tool_calls[0].function;
    const argsObj = JSON.parse(fn.arguments);
    const argsLength = Object.keys(argsObj).length;
    console.log(argsObj);
    let mdTable = generateMarkdownTableFromArguments(fn.arguments);
    let confirm_message = `\n\nPlease confirm the information below to proceed with  \`${fn.name}\`:\n\n`;
    if (argsLength == 0) {
      mdTable = '';
      confirm_message = '\n\n';
    }
    return {
      resultText: content + confirm_message + mdTable,
      functionName: fn.name,
      functionArgs: argsObj
    };
  }

  return {
    resultText: content,
    functionName: null,
    functionArgs: null
  };
}
