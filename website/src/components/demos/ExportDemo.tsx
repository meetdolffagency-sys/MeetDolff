import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MEMORY_TREE, type FileNode } from "@/data/demo";
import { prefersReducedMotion } from "@/intro";
import { Illustrative } from "../StatusBadge";

interface Row {
  key: string;
  node: FileNode;
  depth: number;
}

function flatten(node: FileNode, open: Set<string>, depth = 0, path = ""): Row[] {
  const key = path + node.name;
  const rows: Row[] = [{ key, node, depth }];
  if (node.kind === "dir" && open.has(key)) node.children?.forEach((c) => rows.push(...flatten(c, open, depth + 1, key + "/")));
  return rows;
}

/** A folder unpacking into readable Markdown and structured JSON. */
export function ExportDemo() {
  const root = MEMORY_TREE.name;
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string>("");
  const [pulse, setPulse] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  const rows = flatten(MEMORY_TREE, open);
  const selNode = rows.find((r) => r.key === selected)?.node;

  const exportAll = () => {
    setOpen(new Set([root, `${root}/meetings`]));
    setSelected(`${root}/meetings/meeting-001.md`);
    setPulse((p) => p + 1);
  };
  const reset = () => {
    setOpen(new Set());
    setSelected("");
  };
  const toggle = (r: Row) => {
    if (r.node.kind === "dir") {
      setOpen((o) => {
        const n = new Set(o);
        if (n.has(r.key)) n.delete(r.key);
        else n.add(r.key);
        return n;
      });
    } else setSelected(r.key);
  };

  useLayoutEffect(() => {
    if (!pulse || prefersReducedMotion() || !list.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".tree-row", { opacity: 0, x: -14, duration: 0.4, stagger: 0.07, ease: "power3.out", clearProps: "all" });
    }, list);
    return () => ctx.revert();
  }, [pulse]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-sm btn-primary" onClick={exportAll}>Export this meeting's memory</button>
        <button type="button" className="chip" onClick={reset} disabled={open.size === 0}>Collapse</button>
      </div>
      <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <ul ref={list} role="tree" aria-label="MeetDolff Memory folder" className="min-h-[15rem] bg-obsidian p-3">
          {rows.map((r) => (
            <li key={r.key} role="treeitem" aria-expanded={r.node.kind === "dir" ? open.has(r.key) : undefined} aria-selected={selected === r.key} className="tree-row">
              <button
                type="button"
                onClick={() => toggle(r)}
                style={{ paddingLeft: `${0.5 + r.depth * 1.25}rem` }}
                className={`t-mono flex w-full items-center gap-2 rounded py-2 pr-2 text-left transition-colors hover:bg-white/10 ${selected === r.key ? "bg-white/15 text-chalk" : ""}`}
              >
                <span aria-hidden className={r.node.kind === "dir" ? "text-signal" : "text-aluminium"}>{r.node.kind === "dir" ? (open.has(r.key) ? "▾" : "▸") : "·"}</span>
                {r.node.name}
                {r.node.kind === "dir" ? "/" : ""}
              </button>
            </li>
          ))}
        </ul>
        <div className="min-h-[15rem] bg-obsidian p-5">
          {selNode?.preview ? (
            <>
              <p className="t-mono text-aluminium">{selNode.name}</p>
              <pre key={selNode.name} className="page-in t-mono scrollbar-thin mt-3 overflow-x-auto whitespace-pre text-chalk/90">{selNode.preview}</pre>
            </>
          ) : (
            <p className="t-body muted-dark">Press export, then open any file. Markdown is for you; JSON is for tools and agents.</p>
          )}
        </div>
      </div>
      <Illustrative className="mt-4 text-aluminium" />
    </div>
  );
}
