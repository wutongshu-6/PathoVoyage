# -*- coding: utf-8 -*-
"""
根据文件夹内实际存在的 JPG/JPEG 生成 manifest.json（静态网页无法自动列目录）。

用法（在 template 目录或本脚本所在目录执行均可）:
  python generate_patch_manifests.py

会在以下目录各写一份 manifest.json:
  - all_patches/
  - crc_all_patches/

往上述文件夹新增或删除 patch 图片后，请重新运行本脚本。
"""
from __future__ import print_function

import json
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
EXTS = {".jpg", ".jpeg", ".JPG", ".JPEG"}


def write_manifest(subdir):
    d = os.path.join(ROOT, subdir)
    if not os.path.isdir(d):
        print("skip (missing folder):", d)
        return
    names = sorted(
        f
        for f in os.listdir(d)
        if os.path.isfile(os.path.join(d, f)) and os.path.splitext(f)[1] in EXTS
    )
    out = os.path.join(d, "manifest.json")
    with open(out, "w", encoding="utf-8") as fp:
        json.dump(names, fp, ensure_ascii=False, indent=2)
        fp.write("\n")
    print("Wrote %d -> %s" % (len(names), out))


def main():
    write_manifest("all_patches")
    write_manifest("crc_all_patches")
    return 0


if __name__ == "__main__":
    sys.exit(main())
