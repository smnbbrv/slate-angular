import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { createEditor, NodeEntry, Text } from 'slate';
import { withAngular } from 'slate-angular';
import { DemoTextMarkComponent, MarkTypes } from '../components/text/text.component';
import { DemoLeafComponent } from './leaf.component';

@Component({
  selector: 'demo-search-highlight',
  templateUrl: './search-highlighting.component.html',
  styleUrls: ['./search-highlighting.component.scss'],
})
export class DemoSearchHighlightingComponent implements OnInit {
    keywords = '';

    value = initialValue;

    editor = withAngular(createEditor());

    decorate: (nodeEntry: NodeEntry) => Range[];

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.generateDcoreate();
    }

    keywordsChange(event) {
        this.generateDcoreate();
        this.cdr.markForCheck();
    }

    generateDcoreate() {
        this.decorate = ([node, path]) => {
            const ranges = [];

            if (this.keywords && Text.isText(node)) {
                const { text } = node;
                const parts = text.split(this.keywords);
                let offset = 0;

                parts.forEach((part, i) => {
                    if (i !== 0) {
                        ranges.push({
                            anchor: { path, offset: offset - this.keywords.length },
                            focus: { path, offset },
                            highlight: true,
                        });
                    }

                    offset = offset + part.length + this.keywords.length;
                });
            }

            return ranges;
        };
    }

    renderText = (text: Text) => {
        if (text[MarkTypes.bold] || text[MarkTypes.italic] || text[MarkTypes.code] || text[MarkTypes.underline]) {
            return DemoTextMarkComponent;
        }
    }

    renderLeaf = (text: Text) => {
        if (text['highlight']) {
            return DemoLeafComponent;
        }
        return null;
    }
}

const initialValue = [
    {
        children: [
            {
                text:
                'This is editable text that you can search. As you search, it looks for matching strings of text, and adds ',
            },
            { text: 'decorations', bold: true },
            { text: ' to them in realtime.' },
        ],
    },
    {
        children: [
            { text: 'Try it out for yourself by typing in the search box above!' },
        ],
    },
];
