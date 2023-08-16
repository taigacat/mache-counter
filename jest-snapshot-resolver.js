module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace('.snapspec', '').replace('.tsx', '') +
    '.tsx' +
    snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, '').replace('.tsx', '') +
    '.snapspec.tsx',
  testPathForConsistencyCheck: 'test/pages/example.snapspec.tsx',
};
