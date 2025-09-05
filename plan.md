## Plan: Add Blank Columns to Complete Bootstrap Grid Rows

### Problem

The last swatch in each color group appears wider than others because Bootstrap's flexbox behavior causes columns to expand when there are fewer items than the specified number of columns per row.

### Solution Approach

Instead of preventing column expansion, we'll **calculate how many blank columns are needed
** to complete the last row and add empty `<Col>` components to fill those spaces.

### Implementation Details

#### 1. SwatchGroupSwatches Component

- Currently uses `xs={6}` (6 columns per row)
- Calculate blank columns needed: `6 - (swatches.length % 6)`
- Add empty `<Col>` components after the real swatches
- Only add blanks if `swatches.length % 6 !== 0` (incomplete row exists)

#### 2. SwatchPrimitives Component

- Currently uses `xs={4}` (4 columns per row)
- Calculate total items: `2 + primary.length` (scaleStart + scaleEnd + primary colors)
- Calculate blank columns needed: `4 - (totalItems % 4)`
- Add empty `<Col>` components after the real swatches

#### 3. NamingOptionsModal Component

- Currently uses `xs={2}` (2 columns per row)
- Has exactly 4 items (always 2 complete rows)
- No changes needed

### Code Changes Required

1. **SwatchGroupSwatches.tsx**: Add logic to calculate and render blank columns
2. **SwatchPrimitives.tsx**: Add logic to calculate and render blank columns
3. **Test**: Verify the solution works with different numbers of swatches

### Benefits

- ✅ Maintains consistent column widths
- ✅ Works for any number of columns automatically
- ✅ Preserves Bootstrap's responsive behavior
- ✅ No CSS overrides needed
- ✅ Clean, semantic solution

### Example

If there are 8 swatches in a 6-column row:

- Row 1: 6 swatches (complete)
- Row 2: 2 swatches + 4 blank columns = consistent width

Would you like me to proceed with this implementation?